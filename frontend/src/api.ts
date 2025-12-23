export async function apiGet<T>(path: string): Promise<T> {
    const res = await fetch(`/api${path}`);

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Request failed: ${res.status}. ${text}`);
    }

    return (await res.json()) as T;
}
