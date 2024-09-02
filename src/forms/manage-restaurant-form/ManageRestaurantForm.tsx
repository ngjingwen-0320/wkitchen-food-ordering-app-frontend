import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from '@/components/ui/form';
import DetailsSection from './DetailsSection';
import { Separator } from "@/components/ui/separator";
import CuisinesSection from './CuisinesSection';
import MenuSection from './MenuSection';
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Restaurant } from "@/types";

const formSchema = z.object({
    restaurantName: z.string({
        required_error: "Restaurant name is required",
    }),
    hotline: z.string({
        required_error: "Hotline is required",
    }),
    estimatedReadyTime: z.coerce.number({
        required_error: "Estimated ready time is required",
        invalid_type_error: "Must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "Please select at least one item",
    }),
    menuItems: z.array(
        z.object({
            name: z.string().min(1, "Name is required"),
            price: z.coerce.number().min(1, "Price is required"),
        })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required"}).optional(),
}).refine((data)=> data.imageUrl || data.imageFile, {
    message: "Image or Image URL is required",
    path: ["imageFile"],
});

type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
    restaurant?: Restaurant;
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],
        },
    });

    useEffect(() => {
        if (!restaurant) {
            return;
        }

        const menuItemsFormatted = restaurant.menuItems.map((item) => ({
            ...item,
            price: parseInt((item.price / 100).toFixed(2)),
        }));

        const updatedRestaurant = {
            ...restaurant,
            menuItems: menuItemsFormatted,
        };

        form.reset(updatedRestaurant);
    }, [form, restaurant]);

    const onSubmit = (formDataJson: RestaurantFormData) => {
        const formData = new FormData();
        
        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("hotline", formDataJson.hotline);
        formData.append("estimatedReadyTime", formDataJson.estimatedReadyTime.toString());

        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine);
        });
        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name);
            formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
        });
        
        if (formDataJson.imageFile) {
            formData.append(`imageFile`, formDataJson.imageFile);
        }
        
        onSave(formData);
    };

    return(
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-8 bg-gray-50 p-10 rounded-lg"
            >
                <DetailsSection />
                <Separator />
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />
                {isLoading ? <LoadingButton /> : <Button type="submit" className="bg-yellow-500">Submit</Button>}
            </form>
        </Form>
    )
};

export default ManageRestaurantForm;
