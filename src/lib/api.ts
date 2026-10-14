import Cookies from "js-cookie";

// Automatically switches between your Vercel env variable and local fallback
const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export async function apiFetch<T = any>(
	endpoint: string,
	options: RequestInit = {},
): Promise<{
	success: boolean;
	message?: string;
	data?: T;
	errors?: any[];
	meta?: any;
}> {
	const token = Cookies.get("token");
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
		...(options.headers as Record<string, string>),
	};

	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}

	// Ensure clean path concatenation (avoids missing or double slashes)
	const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
	const url = `${API_BASE_URL.replace(/\/$/, "")}${cleanEndpoint}`;

	try {
		const res = await fetch(url, {
			...options,
			headers,
			credentials: "include",
		});

		const data = await res.json().catch(() => ({
			success: false,
			message: "Server error parsing JSON response",
		}));

		if (!res.ok && !data.message) {
			data.message = `HTTP Error ${res.status}`;
		}

		return data;
	} catch (error) {
		// Catch network failures (e.g., backend is turned off) and return a clean error object
		console.error(`API Fetch Connection Error [${url}]:`, error);
		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: "Network error: Unable to connect to backend server.",
		};
	}
}
