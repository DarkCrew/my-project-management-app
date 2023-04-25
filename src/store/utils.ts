import { TOKEN_LIFETIME } from 'core/rest/AuthApi';

function isExpiredToken(): boolean {
  const createdTime = localStorage.getItem('token-created-time');
  if (!createdTime) return true;
  const currentTime = new Date().getTime();
  if (+currentTime - +createdTime > TOKEN_LIFETIME) {
    return true;
  }
  return false;
}

export default isExpiredToken;
