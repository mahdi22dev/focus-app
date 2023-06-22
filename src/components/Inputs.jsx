import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";

const Inputs = () => {
  const { tempValue2, setTempValue2, tempValue1, setTempValue1 } =
    useGlobalContext();

  return (
    <InputsWrapper className='inputs'>
      <label htmlFor=''>
        pomodoro
        <input
          type='number'
          className='input'
          value={tempValue1}
          onChange={(e) => {
            setTempValue1(e.target.value);
            console.log(tempValue1);
          }}
        />
      </label>

      <label htmlFor=''>
        break
        <input
          type='number'
          value={tempValue2}
          onChange={(e) => {
            setTempValue2(e.target.value);
            console.log(tempValue2);
          }}
          className='input'
        />
      </label>
    </InputsWrapper>
  );
};
const InputsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  label {
    min-width: 50%;
    display: flex;

    justify-content: center;
    align-items: center;
  }
  .input {
    background-color: var(--color-primary-200);
    max-width: 190px;
    width: 100px;
    height: 40px;
    outline: none;
    margin: 5px;
    transition: 0.5s;
    border-radius: 5px;
    padding: 10px;
    text-align: left;
    border: 1px solid var(--color-primary-500);
  }

  input:focus {
    background-color: #fff;
  }
`;
export default Inputs;
