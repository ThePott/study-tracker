// import React, { createContext, ReactNode, useContext, useState } from 'react'
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';

// interface ToggleableButtonProps {
//   value: string
//   isSelected: boolean
//   setSelectedValue: React.Dispatch<React.SetStateAction<string>>
// }

// const ToggleableButton = React.memo(({ value, isSelected }: ToggleableButtonProps) => {
//   const variant = isSelected ? "contained" : "outlined"
//   const setSelectedValue = 
//   const selectValue = () => setSelectedValue(value)

//   return (
//     <Button variant={variant} onClick={selectValue}>{value}</Button>
//   )
// })

// const ToggleableButtonContext = createContext<React.Dispatch<React.SetStateAction<string>> | null>(null)
// const useToggleableButtonContext = () => {
//     const context = useContext(ToggleableButtonContext)
//     if (!context) {
//         throw new Error('Fruit components must be used within FruitBox')
//     }
//     return context
// }

// const ToggleableBar = ({ children, value, onChange }: { children: ReactNode, value: string, onChange: () => void }) => {
//   const [selectedValue, setSelectedValue] = useState<string | null>(null)

//   return (
//     <ToggleableButtonContext.Provider value={setSelectedValue}>
//       <ButtonGroup>{children}</ButtonGroup>
//     </ToggleableButtonContext.Provider>
//   )
// }

// ToggleableBar.Button = ({ value }) => <ToggleableButton value={value} />

// /**
//  * 내가 원하는 형태
//  * <ToggleableBar value={...} onChange={(newValue) => {...}}>
//  *     <ToggleableBar.Button value={어쩌고 저쩌고}> ...
//  * @returns 
//  */


// const Workbench = () => {

//   return (
//     <ToggleableBar value="CORRECT" onChange={() => console.log("---- working")}>
//       <ToggleableBar.Button value="CORRECT" />
//       <ToggleableBar.Button value="WRONG" />
//     </ToggleableBar>
//     // <ButtonGroup variant="contained" aria-label="Basic button group">
//     //   <Button>Done</Button>
//     //   <Button>Pass</Button>
//     //   <Button>Correct</Button>
//     //   <Button>Wrong</Button>
//     //   <Button>NotSolved</Button>
//     // </ButtonGroup>
//   )
// }

// export default Workbench