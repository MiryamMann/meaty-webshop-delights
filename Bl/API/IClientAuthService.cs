using Bl.API.BTOs;
using Bl.API.DTOs;
using Bl.Moduls;

public interface IClientAuthService
{
    Task<BlClient?> LoginAsync(ClientLoginDto dto);
    Task<BlClient?> SignUpAsync(ClientSignUpDto dto);
    Task<bool> ExistsByEmailAsync(string email);
    Task<LoginResponseDto?> LoginWithGoogleTokenAsync(string idToken);
}
