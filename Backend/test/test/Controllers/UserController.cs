using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using MongoDB.Driver;
using test.Models;

namespace test.Controllers
{
    [ApiController]
    [Route("api/usermgm")]
    public class UserMgmController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;


        public UserMgmController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = _userManager.Users.ToList();

                var result = new List<object>();

                foreach (var user in users)
                {
                    var roles = await _userManager.GetRolesAsync(user);
                    if (!roles.Contains("Admin"))
                    {
                        result.Add(new
                        {
                            user.Id,
                            user.UserName,
                            user.NormalizedUserName,
                            user.Email,
                            user.NormalizedEmail,
                            user.EmailConfirmed,
                            user.CreatedOn,
                            user.LockoutEnd
                        });
                    }
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                var roles = await _userManager.GetRolesAsync(user);
                if (roles.Contains("Admin"))
                {
                    return BadRequest("Admin user cannot be deleted");
                }

                var result = await _userManager.DeleteAsync(user);
                if (!result.Succeeded)
                {
                    return StatusCode(500, "Internal Server Error: Unable to delete user");
                }

                return Ok("User deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPut]
        [Route("ban/{id}")]
        public async Task<IActionResult> BanUser(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                var roles = await _userManager.GetRolesAsync(user);
                if (roles.Contains("Admin"))
                {
                    return BadRequest("Admin user cannot be banned");
                }

                user.LockoutEnd = DateTimeOffset.MaxValue;
                var result = await _userManager.UpdateAsync(user);

                if (!result.Succeeded)
                {
                    return StatusCode(500, "Internal Server Error: Unable to ban user");
                }

                return Ok("User banned successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }


        [HttpPut]
        [Route("ban/{id}/{days}")]
        public async Task<IActionResult> BanUser(string id, int days)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                var roles = await _userManager.GetRolesAsync(user);
                if (roles.Contains("Admin"))
                {
                    return BadRequest("Admin user cannot be banned");
                }

                user.LockoutEnd = DateTimeOffset.UtcNow.AddDays(days);
                var result = await _userManager.UpdateAsync(user);

                if (!result.Succeeded)
                {
                    return StatusCode(500, "Internal Server Error: Unable to ban user");
                }

                return Ok($"User banned for {days} day(s) successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }


        [HttpPut]
        [Route("unban/{id}")]
        public async Task<IActionResult> UnbanUser(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                user.LockoutEnd = null;
                var result = await _userManager.UpdateAsync(user);

                if (!result.Succeeded)
                {
                    return StatusCode(500, "Internal Server Error: Unable to unban user");
                }

                return Ok("User unbanned successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}