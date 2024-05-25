using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using test.Dtos;
using test.Models;
using BenchmarkDotNet.Attributes;

namespace test.Controllers

{
   
    [ApiController]
    [Route("api/v1/admin")]
    public class AdminController : ControllerBase
    {
        
            private readonly UserManager<ApplicationUser> _userManager;
            private readonly RoleManager<ApplicationRole> _roleManager;

            public AdminController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
            {
                _userManager = userManager;
                _roleManager = roleManager;
            }

            [HttpPost]
            [Route("register")]
            public async Task<IActionResult> Register([FromBody] RegisterRequest request)
            {
                if (request.Role != "ADMIN")
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
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null || !(await _userManager.CheckPasswordAsync(user, request.Password)))
                {
                    return BadRequest(new LoginResponse { Success = false, Message = "Invalid email or password" });
                }

                var roles = await _userManager.GetRolesAsync(user);
                if (!roles.Contains("ADMIN"))
                {
                    return BadRequest(new LoginResponse { Success = false, Message = "User is not an admin" });
                }

                var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Role, "ADMIN")
        };

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
                    Role = "ADMIN"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new LoginResponse { Success = false, Message = ex.Message });
            }
        }

    }

}

