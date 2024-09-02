import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormItem, FormControl, FormLabel } from '@/components/ui/form';
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
    cuisine: string;
    field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckbox = ({ cuisine, field }: Props) => {
    // `field.value` should be an array of strings based on the form schema
    const isChecked = field.value.includes(cuisine);

    const handleCheckboxChange = (checked: boolean) => {
        if (checked) {
            field.onChange([...field.value, cuisine]);
        } else {
            field.onChange(field.value.filter((value: string) => value !== cuisine));
        }
    };

    return (
        <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
            <FormControl>
                <Checkbox 
                    className="bg-white"
                    checked={isChecked}
                    onCheckedChange={handleCheckboxChange}
                />
            </FormControl>
            <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
        </FormItem>
    );
};

export default CuisineCheckbox;
