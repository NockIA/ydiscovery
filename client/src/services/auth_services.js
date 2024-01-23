
class AuthService {
  setCookie(value) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    const cookieOptions = [
      `expires=${expirationDate.toUTCString()}`,
      "path=/",
      "Secure",
    ];

    const cookieString = `jwt=${encodeURIComponent(
      value
    )}; ${cookieOptions.join("; ")}`;

    document.cookie = cookieString;
  }

  getCookie() {
    const name = "jwt" + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }

    return null;
  }

  deleteCookie() {
    const cookieString =
      "jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=None; Secure";
    document.cookie = cookieString;
  }
}
export default AuthService;
