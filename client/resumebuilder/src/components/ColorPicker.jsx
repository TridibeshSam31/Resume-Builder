//choose the color of the resume 
import {Check, check, Palette} from "lucide-react"
import React , {useState} from "react"


//colors ka array form kro and rest usme colors ka name and code as objects ki tarah pass kr do
//color picker ke andar selectedColor , onChange as props ki tarah pass krenge 
//Because the ColorPicker shouldn’t update parent's state directly.
//It communicates the new color by calling onChange(newColor).

const ColorPicker = ({selectedColor,onChange}) => {
    const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Green", value: "#10B981" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F97316" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Gray", value: "#6B7280" },
    { name: "Black", value: "#1F2937" },
  ];

  const [isOpen,setIsOpen] = useState(false)

  return(
    <div className="relative">
        <button className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg " onClick={()=>setIsOpen(!isOpen)}/>
          {isOpen && (
        <div className="grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
          {colors.map((color) => (
            <div
              key={color.value}
              onClick={() => {
                onChange && onChange(color.value);
                setIsOpen(false);
              }}
              className="relative cursor-pointer group flex flex-col items-center"
            >
              <div
                className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors"
                style={{ backgroundColor: color.value }}
              />

              {selectedColor === color.value && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              <p className="text-xs text-center mt-2 text-gray-600">
                {color.name}
              </p>
            </div>
          ))}
        </div>
      )}   

    </div>
  )


}