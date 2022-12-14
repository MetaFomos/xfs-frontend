import React, {useEffect, useState, useRef} from 'react'
import DataTable from 'react-data-table-component'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { getIdeas, pullRequestSubmit, confirmPullRequestSubmit, completeIdea } from '../../redux/idea/actions'
import parser from 'html-react-parser'
import { CustomLoader } from '../../components/CustomLoader'

interface IInProgressIdeaProps {}

export const InProgressIdea:React.FC<IInProgressIdeaProps> = () => {
    const columns = [
        {
            name: 'Assigned user',
            selector: (row: any) => row.assigned_user.name,
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
            name: 'Budget',
            selector: (row: any) => row.budget,
            sortable: true,
        },
        {
            name: 'Action',
            button: true,
            cell: (row: any) => (
                <div className='flex'>
                    <button className='btn btn-xs mr-1' onClick={() => onMoreBtn(row)}>More</button>
                </div>
            ),
        },
    ];

    const dispatch: Dispatch<any> = useDispatch()
    const moreLabelRef = useRef<HTMLLabelElement>(null)
    const ideas = useSelector((state: any) => state.idea.inprogress_ideas)
    const userId = useSelector((state: any) => state.auth.user._id)
    const roleId = useSelector((state: any) => state.auth.user.role)
    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState({
        pullRequest: false,
        confirm: false,
        moveComplete: false
    })
    const [formData, setFormData] = useState({
        ideaId: '',
        assignUser: '',
        milestone: [],
        selectedMilestoneId: null,
        selectedMilestoneIndex: null,
        pullRequestUrl: ''
    })
    const onMoreBtn = (row: any) => {
        var currentMilestoneId: any = null
        var currentMilestoneIndex: any = null
        row.milestone.forEach((item: any, index: number) => {
            if (!item.complete && currentMilestoneId == null) {
                currentMilestoneId = item._id
                currentMilestoneIndex = index+1
            }
        })
        setFormData({
            ...formData,
            ideaId: row._id,
            assignUser: row.assigned_user._id,
            milestone: row.milestone,
            selectedMilestoneId: currentMilestoneId,
            selectedMilestoneIndex: currentMilestoneIndex
        })
        moreLabelRef.current?.click()
    }
    const onChange = (e: any) => {
        setFormData({ ...formData, pullRequestUrl: e.target.value })
    }
    useEffect(() => {
        async function fetchData() {
            await dispatch(getIdeas({ type: 'inprogress' }))
            setPending(false)
        }
        fetchData()
    }, [])

    const onPullRequestSubmit = async () => {
        setLoading({ ...loading, pullRequest: true })
        await dispatch(pullRequestSubmit({ ideaId: formData.ideaId, milestoneIndex: formData.selectedMilestoneIndex, milestoneId: formData.selectedMilestoneId, pullRequestUrl: formData.pullRequestUrl }))
        moreLabelRef.current?.click()
        setLoading({ ...loading, pullRequest: false })
    }
    const onConfirmPullRequestSubmit = async () => {
        setLoading({ ...loading, confirm: true })
        await dispatch(confirmPullRequestSubmit({ ideaId: formData.ideaId, milestoneIndex: formData.selectedMilestoneIndex, milestoneId: formData.selectedMilestoneId, pullRequestUrl: formData.pullRequestUrl }))
        moreLabelRef.current?.click()
        setLoading({ ...loading, confirm: false })
    }
    const onMoveCompleteSubmit = async () => {
        setLoading({ ...loading, moveComplete: true })
        await dispatch(completeIdea({ ideaId: formData.ideaId }))
        moreLabelRef.current?.click()
        setLoading({ ...loading, moveComplete: false })
    }
    return (
        <div className='hero'>
            <div className="hero-content xl:w-4/5 md:w-4/5 sm:w-full">
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
                    {(userId === formData.assignUser && formData.selectedMilestoneId != null) && (
                        <div className='flex items-center pb-2'>
                            <label className="label w-3/12">
                                <span className="label-text font-bold">Url:</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder={`Pull request url (Milestone ${formData.selectedMilestoneIndex})`} 
                                className="input input-bordered w-9/12 mr-2 input-sm" 
                                value={formData.pullRequestUrl}
                                onChange={onChange}
                            />
                        </div>
                    )}
                    <ul className="steps steps-vertical">
                        {formData.milestone.map((item: any, index: number) => (
                            <li key={index} className={`step ${(item.gitPullRequestUrl != '' && item.complete) != '' ? 'step-primary' : ''} break-all`}>{item.title} {(item.gitPullRequestUrl != '') ? '('+item.gitPullRequestUrl+')' : ''}</li>
                        ))}
                    </ul>

                    {(roleId == '1' && formData.selectedMilestoneIndex !== null) && (
                        <label className='label text-base font-bold justify-end'>This pull request is correct? (Milestone {formData.selectedMilestoneIndex})</label>
                    )}

                    <div className="modal-action">
                        {(userId === formData.assignUser && formData.selectedMilestoneId != null) && (
                            <label className={`btn ${loading.pullRequest ? 'loading' : ''}`} onClick={() => onPullRequestSubmit()}>Save Url</label>
                        )}
                        {(roleId == '1' && formData.selectedMilestoneIndex !== null) && 
                            (<label className={`btn ${loading.confirm ? 'loading' : ''}`} onClick={() => onConfirmPullRequestSubmit()}>Confirm</label> )
                        }
                        {(roleId == '1' && formData.selectedMilestoneIndex == null) &&
                            (<label className={`btn ${loading.moveComplete ? 'loading' : ''}`} onClick={() => onMoveCompleteSubmit()}>Move to Complete</label>)
                        }
                        <label htmlFor="moreInfoModal" className="btn">Close</label>
                    </div>
                </div>
            </div>
            {/* more info modal */}
        </div>
    )
}