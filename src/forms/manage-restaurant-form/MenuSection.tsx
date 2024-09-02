import { useFieldArray, useFormContext } from "react-hook-form";
import { FormDescription, FormField, FormItem } from '@/components/ui/form';
import { Button } from "@/components/ui/button";
import MenuItemInput from './MenuItemInput';

const MenuSection = () => {
    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "menuItems",
    });

    return <div className="space-y-2">
        <div>
            <h2 className="text-2xl font-bold">Menu</h2>
            <FormDescription>
                Add, edit, or remove menu items for your restaurant
            </FormDescription>
        </div>
            <FormField control={control} name="menuItems" render={()=>(
                <FormItem className="flex flex-col gap-2">
                    {fields.map((item, index)=> (
                        <MenuItemInput 
                          key={item.id}
                          index={index} 
                          removeMenuItem={() => remove(index)}
                          />
                    ))}
                </FormItem>
            )}
        />
        <Button 
          type="button"
          onClick={() => append({ name: "", price: ""})}
          className="bg-yellow-500">
            Add New Item
        </Button>
    </div>
};

export default MenuSection;
