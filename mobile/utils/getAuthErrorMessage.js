export default function getAuthErrorMessage(err) {
    switch (err.code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Incorrect email or password';

      case 'auth/invalid-email':
        return 'Invalid email address';

      case 'auth/user-disabled':
        return 'This account has been disabled';

      default:
        return 'Something went wrong. Try again.';
    }
  };
