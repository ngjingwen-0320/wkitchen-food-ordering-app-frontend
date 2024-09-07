import { useSearchMenuItems } from '@/api/RestaurantApi';
import React from 'react';
import { useParams } from 'react-router-dom';

export const SearchPage: React.FC = () => {
  // Retrieve menuItems from URL parameters
  const { menuItems } = useParams<{ menuItems: string }>();

  // Parse menuItems into an array of item names
  const searchedMenuItems = menuItems ? menuItems.split(',').map(item => item.trim()) : [];

  // Fetch results using the custom hook
  const { results, isLoading } = useSearchMenuItems(searchedMenuItems.map(name => ({ name })));

  // Handle loading state
  if (isLoading) {
    return <span>Loading...</span>;
  }

  // Debug log to inspect the results data structure
  console.log("API Results:", results);

  // Function to find and return menu items that match the search names
  const getMatchingMenuItems = (menuItems: any[]) => {
    return menuItems.filter((menuItem: any) =>
      searchedMenuItems.includes(menuItem.name)
    );
  };

  return (
    <div>
      <span>User searched for: {menuItems}</span>
      <div>
        {results?.data && results.data.length > 0 ? (
          results.data.map((restaurant) => {
            const matchingItems = getMatchingMenuItems(restaurant.menuItems);
            return matchingItems.length > 0 ? (
              <div key={restaurant._id}>
                <h3>{restaurant.restaurantName}</h3>
                <div>
                  {matchingItems.map((menuItem) => (
                    <div key={menuItem._id}>
                      Found menu item: {menuItem.name} - RM {menuItem.price.toFixed(2)}
                    </div>
                  ))}
                </div>
              </div>
            ) : null;
          })
        ) : (
          <span>No results found.</span>
        )}
      </div>
    </div>
  );
};

SearchPage.displayName = 'SearchPage';
