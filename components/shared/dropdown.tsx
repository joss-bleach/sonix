"use client";

import { FunctionComponent, startTransition, useEffect, useState } from "react";
import { ICategory } from "@/mongodb/database/models/category.model";

// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";

// Actions
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.actions";

interface DropdownProps {
  onChangeHandler?: (value: string) => void;
  value?: string;
}

export const Dropdown: FunctionComponent<DropdownProps> = ({
  onChangeHandler,
  value,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getAllCategories();
      if (!categories) {
        return;
      }
      setCategories(categories as ICategory[]);
    };
    getCategories();
  }, []);

  const handleAddNewCategory = () => {
    createCategory({ categoryName: newCategory.trim() }).then((category) => {
      setCategories((previousState) => [...previousState, category]);
    });
  };

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="select-itme p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add a category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Add a new event category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Enter a category name"
                  className="input-field mt-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddNewCategory)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};
