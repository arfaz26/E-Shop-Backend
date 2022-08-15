export enum MESSAGES {
  EMAIL_ALREADY_EXISTS = 'An Account with this email already exists',
  USER_NOT_FOUND = 'User not found',
  INVALID_CREDENTIALS = 'Invalid username or password',
  UNAUTHORIZED = 'You are not Authorized to access this resource',
  NEW_PASSWORD_MISMATCH = 'New password and confirm password mismatch',
  INVALID_PASSWORD = 'Password is incorrect',
  RESET_PASSWORD_LINK_EXPIRED = 'Reset password link has expired',
}

export enum SUCCESS_MESSAGES {
  FORGOT_PASSWORD = 'Link to reset your password is sent to your registered email',
  UPDATE_PASSWORD_SUCCESSFUL = 'Password has been changed successfully',
  RESET_PASSWORD_SUCCESSFUL = 'Password has been changed successfully',
}
