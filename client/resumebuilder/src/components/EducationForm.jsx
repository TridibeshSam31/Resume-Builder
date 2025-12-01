import React from 'react'
import { GraduationCap,Plus,Trash2 } from 'lucide-react'

//this EducationForm will take the data i.e userInput and OnChange as inputs
const EducationForm = ({data,onChange}) => {
    //addEducation click krne par yeh function run krega 
    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: "",
        }
        onChange([...data , newEducation]) //use of spreadoperater , saving the data with newEducation fields 

    }
    
    //to delte the education  not needed 
    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);

        //we can't use splice here 
        /*
        splice() mutates the original array → BAD in React
        React state should ALWAYS be immutable
        .filter() creates a new array → good
        
        
        */

    }

    const updateEducation = (index, field, value) => {

    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
    };
    
  return (
    <div>EducationForm</div>
  )
}

export default EducationForm