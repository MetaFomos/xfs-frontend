import React, { useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { getIdeas } from '../../redux/idea/actions'
import parser from 'html-react-parser'
import { CustomLoader } from '../../components/CustomLoader'
import { categories } from '../../constants'

interface ICompletedIdeaProps {}

export const CompletedIdea:React.FC<ICompletedIdeaProps> = () => {
    const columns = [
        {
            name: 'Assigned user',
            selector: (row: any) => row.assigned_user.name,
            sortable: true,
        },
        {
            name: 'Type', 
            selector: (row: any) => categories[row.category].label, 
            sortable: true, 
        },
        {
            name: 'Github',
            selector: (row: any) => row.assigned_user.github,
            sortable: true,
        },
        {
            name: 'Title',
            selector: (row: any) => row.title,
            sortable: true,
        },
        {
            name: 'Content',
            selector: (row: any) => parser(row.content.slice(0, 20).concat('...')),
            sortable: true,
        },
        {
            name: 'Action',
            button: true,
            cell: (row: any) => (
                <div className='flex'>
                    <button className='btn btn-xs' onClick={() => onMoreBtn(row)}>More</button>
                </div>
            ),
        },
    ];
    const dispatch: Dispatch<any> = useDispatch()
    const ideas = useSelector((state: any) => state.idea.completed_ideas)
    const moreLabelRef = useRef<HTMLLabelElement>(null)
    const [pending, setPending] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        github: '',
        title: '',
        content: ''
    })
    const onMoreBtn = (formData: any) => {
        setFormData({
            name: formData.user.name,
            github: formData.user.github,
            title: formData.title,
            content: formData.content
        })
        moreLabelRef.current?.click()
    }
    useEffect(() => {
        async function fetchData() {
            await dispatch(getIdeas({ type: 'completed' }))
            setPending(false)
        }
        fetchData()
    }, [])
    return (
        <div className='hero'>
            <div className="hero-content w-full">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                    <div className="card-body">
                        <DataTable
                            columns={columns}
                            data={ideas} 
                            pagination 
                            highlightOnHover={true} 
                            progressPending={pending} 
                            progressComponent={<CustomLoader />}
                            responsive={true} 
                            striped={true}
                        />
                    </div>
                </div>
            </div>

            {/* more info modal */}
            <label htmlFor="moreInfoModal" className="btn hidden" ref={moreLabelRef}>open modal</label>
            <input type="checkbox" id="moreInfoModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    
                    <div className='flex items-center pb-2'>
                        <label className="label w-4/12">
                            <span className="label-text font-bold">Name:</span>
                        </label>
                        <label className='w-8/12'>{formData.name}</label>
                    </div>
                    <div className='flex items-center pb-2'>
                        <label className="label w-4/12">
                            <span className="label-text font-bold">Github:</span>
                        </label>
                        <label className='w-8/12'>{formData.github}</label>
                    </div>
                    <div className='flex items-center pb-2'>
                        <label className="label w-4/12">
                            <span className="label-text font-bold">Title:</span>
                        </label>
                        <label className='w-8/12'>{formData.title}</label>
                    </div>
                    <div className='flex items-start pb-2'>
                        <label className="label w-4/12">
                            <span className="label-text font-bold">Content:</span>
                        </label>
                        <label className='w-8/12'>{parser(formData.content)}</label>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="moreInfoModal" className="btn">Close</label>
                    </div>
                </div>
            </div>
            {/* more info modal */}
        </div>
    )
}