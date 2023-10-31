﻿namespace Pet4YouAPI.Models
{
    public enum RegistrationResult
    {
        Success,
        LoginExists,
        EmailExists,
        OtherError
    }

    public enum ChangePasswordResult
    {
        Success,
        UserNotFound,
        IncorrectOldPassword,
        NewPasswordEqualsOld
    }

    public enum DeletingResult
    {
        Success,
        ItemNotFound,
        AccessDenied
    }
}
