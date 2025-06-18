import React, { useEffect, useState } from 'react'
import { BookData, ProgressData, QuestionGroup, Topic } from '../_interfaces/student-interfaces'
import axios from 'axios'
import { useOneBook } from './apiHooks'

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


// 여기서 북 데이터로 박스들을 만든 다음에 data(progress)를 이용해서 현재 state를 표시해야 함
// 1. 북 데이터를 박스로 표시한다.


const ProgressInBook = ({ bookId, dataArray }: { bookId: string, dataArray: ProgressData[] }) => {
    const { book, loading, error } = useOneBook(bookId)
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!book) return <div>No Book Found __Unhandled Error</div>

    const GroupBox = (questionGroup: QuestionGroup) => {
        const progress = dataArray.find((data) => data.groupId === questionGroup.groupId)

        return (
            <div key={questionGroup.groupId} className='bg-blue-400 p-3 flex justify-end'>
                <p>{questionGroup.group}</p>
                {progress && <p>{progress.completed}</p>}
            </div>
        )
    }
    
    const TopicStepBox = (topic: Topic) => {
        // const stepArray = topic.stepArray
        if (topic.stepArray.length === 0) { return null }
    
        return (
            <div key={topic.topicId} className='bg-amber-400 p-3'>
                {topic.stepArray.map((step) => {
                    return (
                        <div>
                            <p>{topic.title} __{step.title}</p>
                            {step.questionGroupArray.map((questionGroup) => GroupBox(questionGroup))}
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
                    {book.topicArray.map((topic) => TopicStepBox(topic))}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default ProgressInBook
