using System.Net;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;


using test.Models;
using test.Dtos;
using Microsoft.AspNetCore.Authorization;
using BenchmarkDotNet.Attributes;

namespace test.Controllers
{
    [BenchmarkCategory]
    [ApiController]
    [Route("api/v1/auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public AuthController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }



        [HttpPost]
        [Route("role/add")]
        public async Task<IActionResult> CreateRole([FromBody] RoleRequest request)
        {
            //if (request.Role != "LANDLORD")
            //{
            //    return BadRequest(new { message = "Invalid role" });
            //}
            var appRole = new ApplicationRole { Name = request.Role };
            var createRole = await _roleManager.CreateAsync(appRole);

            return Ok(new { message = "Role created successfully" });
        }


        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (request.Role != "LANDLORD" && request.Role != "TENANT")
            {
                return BadRequest(new RegisterResponse { Message = "Invalid role" });
            }

            var result = await RegisterAsync(request, request.Role);
            return result.Success ? Ok(result) : BadRequest(result.Message);
        }

        private async Task<RegisterResponse> RegisterAsync(RegisterRequest request, string role)
        {
            try
            {
                var userExists = await _userManager.FindByEmailAsync(request.Email);
                if (userExists != null) return new RegisterResponse { Message = "User already exists", Success = false };

                // Create a new user with the provided details
                var newUser = new ApplicationUser
                {
                    Email = request.Email,
                    FullName = request.FullName,
                    PhoneNumber = request.PhoneNumber,
                    Address = request.Address,
                    UserName = request.Username,
                    // Optionally, set other properties as needed
                };

                var createUserResult = await _userManager.CreateAsync(newUser, request.Password);
                if (!createUserResult.Succeeded)
                {
                    return new RegisterResponse { Message = $"Create user failed: {createUserResult.Errors?.FirstOrDefault()?.Description}", Success = false };
                }

                // Add the user to the specified role
                var addToRoleResult = await _userManager.AddToRoleAsync(newUser, role);
                if (!addToRoleResult.Succeeded)
                {
                    return new RegisterResponse { Message = $"Add user to role failed: {addToRoleResult.Errors?.FirstOrDefault()?.Description}", Success = false };
                }

                // Registration successful
                return new RegisterResponse { Success = true, Message = "User registered successfully" };
            }
            catch (Exception ex)
            {
                return new RegisterResponse { Success = false, Message = ex.Message };
            }
        }


        [HttpPost]
        [Route("login")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(LoginResponse))]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null || !(await _userManager.CheckPasswordAsync(user, request.Password)))
                {
                    return BadRequest(new LoginResponse { Success = false, Message = "Invalid email or password" });
                }

                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                };

                var roles = await _userManager.GetRolesAsync(user);
                var roleClaims = roles.Select(x => new Claim(ClaimTypes.Role, x));
                claims.AddRange(roleClaims);

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("q209c nwojnq2uorycqonfjlawfq3p489crn oqc[ldwwfchlf njkf b"));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var expires = DateTime.Now.AddMinutes(60);

                var token = new JwtSecurityToken(
                    issuer: "http://localhost:7154",
                    audience: "http://localhost:7154",
                    claims: claims,
                    expires: expires,
                    signingCredentials: creds
                );

                return Ok(new LoginResponse
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(token),
                    Message = "Login Successful",
                    Email = user.Email,
                    Success = true,
                    UserID = user.Id.ToString(),
                    Role = roles.FirstOrDefault(),
                    Name = user.FullName,
                    Username = user.UserName
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new LoginResponse { Success = false, Message = ex.Message });
            }
        }



        [ApiController]
        [Route("api/v1/user")]
        public class UserController : ControllerBase
        {
            private readonly UserManager<ApplicationUser> _userManager;

            public UserController(UserManager<ApplicationUser> userManager)
            {
                _userManager = userManager;
            }

            [HttpGet]
            [Route("search/{email}")]
            public async Task<IActionResult> SearchUser(string email)
            {
                var user = await _userManager.FindByEmailAsync(email);
                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                return Ok(user);
            }

            [HttpDelete]
            [Route("delete/{userId}")]
            public async Task<IActionResult> DeleteUser(string userId)
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                var result = await _userManager.DeleteAsync(user);
                if (!result.Succeeded)
                {
                    return BadRequest(new { message = "Failed to delete user" });
                }

                return Ok(new { message = "User deleted successfully" });
            }
        }







        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserDetails(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("UserId cannot be empty");
            }

            if (!Guid.TryParse(userId, out _))
            {
                return BadRequest("UserId must be valid.");
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            var userDetails = new
            {
                user.UserName,
                user.Email,
                user.PhoneNumber,
                user.Address,
                user.FullName,
                user.CreatedOn
            };

            return Ok(userDetails);
        }


        //[HttpPut]
        //[Route("profile/{userId}")]
        //[Authorize]
        //public async Task<IActionResult> UpdateUserProfile(string userId, [FromBody] UserProfileDto updatedProfile)
        //{
        //    try
        //    {
        //        var user = await _userManager.FindByIdAsync(userId);
        //        if (user == null)
        //        {
        //            return NotFound(new { message = "User not found" });
        //        }

        //        // Update the user's profile properties
        //        user.FullName = updatedProfile.FullName;
        //        user.Email = updatedProfile.Email;
        //        user.PhoneNumber = updatedProfile.PhoneNumber;
        //        user.Address = updatedProfile.Address;
        //        // Update other properties as needed

        //        var updateResult = await _userManager.UpdateAsync(user);
        //        if (!updateResult.Succeeded)
        //        {
        //            return BadRequest(new { message = $"Failed to update profile: {updateResult.Errors?.FirstOrDefault()?.Description}" });
        //        }

        //        return Ok(new { message = "Profile updated successfully" });
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(new { message = $"Error updating profile: {ex.Message}" });
        //    }
        //}

        [HttpPut]
        [Route("update-profile/{userId}")]
        //[Authorize(Roles = "ADMIN,SUPER_ADMIN")] // Adjust authorization as needed
        public async Task<IActionResult> UpdateUserProfile(string userId, [FromBody] UserProfileDto profileUpdate)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                // Update user profile properties based on the profileUpdate DTO
                user.FullName = profileUpdate.FullName;
                user.Email = profileUpdate.Email;
                user.PhoneNumber = profileUpdate.PhoneNumber;
                user.Address = profileUpdate.Address;
                // Update other properties as needed

                // Save changes to the user profile
                var updateResult = await _userManager.UpdateAsync(user);
                if (!updateResult.Succeeded)
                {
                    // Handle update failure
                    return BadRequest(new { message = "Failed to update user profile" });
                }

                return Ok(new { message = "User profile updated successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error updating user profile: {ex.Message}" });
            }
        }

     





    }

}
