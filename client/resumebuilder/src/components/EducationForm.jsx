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
    <div>
        <div>
            <div>
                <h3> 
                    Education
                </h3>
                <p>Add Your Education Deatails</p>
            </div>
            <button onClick={()=>addEducation()}>
                <Plus className='size-4'/>
                Add Education
            </button>
        </div>
        {data.length === 0 ? (
            <div>
                <GraduationCap/>
                <p>No Education Added Yet</p>
                <p>Click "Add Education" to get started</p>
            </div>
        ):(
           <div className="space-y-4">
          {data.map((Education, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4>Education #{index + 1}</h4>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={Education.institution || ""}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  type="text"
                  placeholder="InstitutionName"
                  className="px-3 py-2 text-sm"
                />

                <input
                  value={Education.degree || ""}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  type="text"
                  placeholder="Degree (e.g, Bachelor's, Master's)"
                  className="px-3 py-2 text-sm"
                />

                <input
                  value={Education.field || ""}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  type="text"
                  className="px-3 py-2 text-sm"
                  placeholder="Field of Study"
                />

                <input
                  value={Education.graduation_date || ""}
                  onChange={(e) =>
                    updateEducation(index, "graduation_date", e.target.value)
                  }
                  type="month"
                  className="px-3 py-2 text-sm "
                />
              </div>
              <input
                value={Education.gpa || ""}
                onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                type="text"
                className="px-3 py-2 text-sm"
                placeholder="GPA (optional)"
              />
            </div>
          ))}
        </div>
      )}

        
    </div>
  )
}

export default EducationForm