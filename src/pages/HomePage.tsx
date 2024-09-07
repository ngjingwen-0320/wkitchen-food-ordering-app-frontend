import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import { SearchForm } from '../components/SearchBar';

export default function HomePage() {
    const navigate = useNavigate();
    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`,
        });
    };

    return (
        <div className="flex flex-col gap-12">
            <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold tracking-tight text-yellow-600">
                    Fresh Flavors, Quick Orders
                </h1>
                <span className="text-xl">Browse our menu, select your favorites, and let us handle the rest!</span>
                <SearchBar placeHolder="Search by food name" onSubmit={handleSearchSubmit} />
                <div className="flex justify-center gap-4">
                    <Button className="font-bold bg-yellow-500 px-4 py-2 rounded-full w-40">Dine in</Button>
                    <Button className="font-bold bg-yellow-500 px-4 py-2 rounded-full w-40">Takeaway</Button>
                </div>
            </div>
        </div>
    );
};
