import { useQuery } from 'react-query';
import { MenuItem, MenuItemSearchResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchMenuItems = (menuItems?: MenuItem[]) => {
    const createSearchRequest = async (): Promise<MenuItemSearchResponse> => {
        if (!menuItems || menuItems.length === 0) {
            throw new Error("No menu items provided for search");
        }

        // Construct a comma-separated list of menu item names
        const names = menuItems.map(item => item.name).join(',');

        // Debug log to verify the request URL
        console.log(`Fetching from URL: ${API_BASE_URL}/api/restaurant/search?menuItems=${encodeURIComponent(names)}`);

        const response = await fetch(
            `${API_BASE_URL}/api/restaurant/search?menuItems=${encodeURIComponent(names)}`
        );

        if (!response.ok) {
            throw new Error(`Error fetching menu items: ${response.statusText}`);
        }

        const data = await response.json();

        // Debug log to inspect the API response
        console.log("API Response:", data);

        return data;
    };

    const { data: results, isLoading, error } = useQuery(
        ["searchMenuItems", menuItems],
        createSearchRequest,
        {
            enabled: !!menuItems && menuItems.length > 0,
        }
    );

    // Debug log to inspect query status and error
    console.log("Query Status:", isLoading, "Error:", error);

    return {
        results,
        isLoading,
        error
    };
};
