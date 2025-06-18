import React, { useEffect, useState } from 'react'
import { BookData, CompletedStatus, ProgressData, QuestionGroup, Topic } from '../_interfaces/student-interfaces'
import axios from 'axios'
import { useOneBook, useUpdateProgressCompleted } from './apiHooks'

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { possibleCompletedArray } from '../_interfaces/student-interfaces';
import CircularProgress from '@mui/material/CircularProgress';


// 여기서 북 데이터로 박스들을 만든 다음에 data(progress)를 이용해서 현재 state를 표시해야 함
// 1. 북 데이터를 박스로 표시한다.


const ProgressInBook = ({ bookId, dataArray }: { bookId: string, dataArray: ProgressData[] }) => {
    const { book, loading, error } = useOneBook(bookId)
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!book) return <div>No Book Found __Unhandled Error</div>

    const GroupBox = ({ questionGroup }: { questionGroup: QuestionGroup }) => {
        const progress = dataArray.find((data) => data.groupId === questionGroup.groupId)
        if (!progress) { return <div>---- Unhnadled Error: No matching progress found ----</div> }

        const [completed, setCompleted] = useState<CompletedStatus>(progress.completed)
        // let outerIsLoading = false
        const setCompletedToNext = () => {
            const currentIndex = possibleCompletedArray.indexOf(completed)
            const nextIndex = (currentIndex + 1) % possibleCompletedArray.length
            const nextCompleted = possibleCompletedArray[nextIndex]

            setCompleted(nextCompleted)
            return nextCompleted
        }

        const { updateProgressCompleted, isLoading, error } = useUpdateProgressCompleted(progress._id)


        const clickThenUpdateCompleted = () => {
            const nextCompleted = setCompletedToNext()
            updateProgressCompleted(nextCompleted)
        }

        return (
            <div
                className='bg-blue-400 p-3 flex justify-end items-center gap-3'
                onClick={clickThenUpdateCompleted}
            >
                {isLoading && <CircularProgress size={16} />}
                {error && <p>error</p>}
                <p>{questionGroup.group}</p>
                {progress && <p>{completed}</p>}
            </div>
        )
    }

    const TopicStepBox = ({ topic }: { topic: Topic }) => {
        // const stepArray = topic.stepArray
        if (topic.stepArray.length === 0) { return null }

        return (
            <div className='bg-amber-400 p-3'>
                {topic.stepArray.map((step) => {
                    return (
                        <div key={step.stepId}>
                            <p>{topic.title} __{step.title}</p>
                            {step.questionGroupArray.map((questionGroup) => <GroupBox key={questionGroup.groupId} questionGroup={questionGroup} />)}
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-3 w-full'>
            <div className='w-full h-[100px] bg-green-400'>yeah</div>
            <Accordion className='w-full'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <span>book.title</span>
                </AccordionSummary>
                <AccordionDetails>
                    {book.topicArray.map((topic) => <TopicStepBox key={topic.topicId} topic={topic} />)}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default ProgressInBook
