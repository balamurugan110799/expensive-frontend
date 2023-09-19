import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import Layout from '../../Components/Layout'

export default function CreateYear() {

  const [tags, setTags] = useState([])

    function handleKeyDown(e){
        if(e.key !== 'Enter') return
        const value = e.target.value
        if(!value.trim()) return
        setTags([...tags, value])
        e.target.value = ''
    }

    function removeTag(index){
        setTags(tags.filter((el, i) => i !== index))
    }
  const renderYearContent = (year) => {
    const tooltipText = `Tooltip for year: ${year}`;
    return <span title={tooltipText}>{year}</span>;
  };
  const [data, setData] = useState([
    { id: 0, name: "Bike", keyname: "bike", create: false },
    { id: 1, name: "Home", keyname: "home", create: false },
  ])
  return (
    <div>
      <Layout>
        <form>

          <div>
            <label className="mx-4 text-primary text-sm font-semibold">Date</label>
            <DatePicker
              selected={new Date()}
              renderYearContent={renderYearContent}
              showYearPicker
              dateFormat="yyyy"
              className="border p-1  mx-4 h-[36px] text-sm"
            />
          </div>

          <div className="tags-input-container">
            { tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            )) }
            <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Type somthing" />
            </div>
        </form>
      </Layout>

    </div>
  )
}
