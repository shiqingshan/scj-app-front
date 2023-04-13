import Cookies from "js-cookie";

const TokenKey = "User-Token";
const AdminTokenKey = "Admin-Token";
const CompanyTokenKey = "Company-Token";

export function getTokenKey(accountType: string): string {
	if (accountType === "0") {
		return TokenKey;
	} else if (accountType === "1") {
		return CompanyTokenKey;
	} else if (accountType === "2") {
		return AdminTokenKey;
	} else {
		return TokenKey;
	}
}

export function getToken(key: string): string {
	return Cookies.get(key);
}

export function setToken(key: string, token: string) {
	return Cookies.set(key, token);
}

export function removeToken(key: string) {
	return Cookies.remove(key);
}
