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

namespace test.Controllers
{
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
            if (request.Role != "LANDLORD")
            {
                return BadRequest(new { message = "Invalid role" });
            }
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
                if (user is null)
                {
                    return BadRequest(new LoginResponse { Success = false, Message = "User not found" });
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
                    Email = user?.Email,
                    Success = true,
                    UserID = user?.Id.ToString()
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new LoginResponse { Success = false, Message = ex.Message });
            }
        }

        [HttpPost]
        [Route("create-admin")]
        public async Task<IActionResult> CreateAdmin([FromBody] AdminCreationRequest request, string rootPassword)
        {
            try
            {
                // Check if the root password is correct
                if (rootPassword != "ROOT_PASSWORD")
                {
                    return BadRequest(new { message = "Root password is incorrect" });
                }

                // Create a new admin user regardless of existing admins
                var adminUser = new ApplicationUser
                {
                    UserName = request.Username,
                    Email = request.Email,
                    FullName = request.FullName,
                    PhoneNumber = request.PhoneNumber,
                };

                var createResult = await _userManager.CreateAsync(adminUser, request.Password);

                if (createResult.Succeeded)
                {
                    // Assign the "Super Admin" role to the admin user
                    await _userManager.AddToRoleAsync(adminUser, "SUPER_ADMIN");
                    return Ok(new { message = "SUPER ADMIN user created successfully" });
                }
                else
                {
                    return BadRequest(new { message = "Failed to create SUPER ADMIN user" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error creating SUPER ADMIN user: {ex.Message}" });
            }
        }

        [HttpPost]
        [Route("create-super-admin")]
        [Authorize(Roles = "SUPER_ADMIN")]
        public async Task<IActionResult> CreateSuperAdmin([FromBody] AdminCreationRequest request, string superAdminPassword)
        {
            try
            {
                // Check if the super admin password is correct
                if (superAdminPassword != "SUPER_ADMIN_PASSWORD")
                {
                    return BadRequest(new { message = "Super Admin password is incorrect" });
                }

                // Create a new admin user
                var adminUser = new ApplicationUser
                {
                    UserName = request.Username,
                    Email = request.Email,
                    FullName = request.FullName,
                    PhoneNumber = request.PhoneNumber,
                    Address = request.Address,
                };

                var createResult = await _userManager.CreateAsync(adminUser, request.Password);

                if (createResult.Succeeded)
                {
                    await _userManager.AddToRoleAsync(adminUser, "ADMIN");
                    return Ok(new { message = "ADMIN user created successfully" });
                }
                else
                {
                    return BadRequest(new { message = "Failed to create ADMIN user" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error creating ADMIN user: {ex.Message}" });
            }
        }




    }
}
