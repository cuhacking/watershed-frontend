import React from 'react';
import styled from 'styled-components';
import {Collapse} from 'react-collapse';

export interface FAQEntry {
  question: string;
  answer: string;
}

const Chevron = styled.div<{down: boolean}>`
  display: inline-block;
  margin-top: 6px;
  min-width: 16px;

  &:before {
    width: 4px;
    height: 12px;
    transition: all 0.5s cubic-bezier(0.33, 1, 0.68, 1);
    display: inline-block;
    border-radius: 8px;
    background: var(--white);
    transform: ${(props) =>
      props.down ? 'rotate(-135deg)' : 'rotate(-45deg)'};
    content: '';
  }

  &:after {
    width: 4px;
    height: 12px;
    transition: all 0.5s cubic-bezier(0.33, 1, 0.68, 1);
    display: inline-block;
    border-radius: 8px;
    background: var(--white);
    transform: ${(props) =>
      props.down ? 'rotate(-45deg)' : 'rotate(-135deg)'};
    content: '';
    margin-left: 3px;
  }
`;

const QuestionTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media only screen and (min-width: 1200px) {
    justify-content: flex-start;
  }
`;

const QuestionWrapper = styled.div<{open: boolean}>`
  width: 100%;
  cursor: pointer;
  margin: 0;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 8px;
  transition: border 500ms cubic-bezier(0.33, 1, 0.68, 1);
  border: 1px solid
    ${(props) => (props.open ? 'var(--vanilla)' : 'rgba(0, 0, 0, 0)')};
`;

const Question = styled.h2`
  margin-right: 24px;
  font-weight: normal;
`;

const Answer = styled.p`
  margin: 0px;
  font-family: var(--primary-font);
  max-width: 100%;
  line-height: 1.8em;

  @media only screen and (min-width: 1200px) {
    width: 80%;
  }
`;

const FaqWrapper = styled.div``;

export interface FaqProps {
  entry: FAQEntry;
  index: number;
  open?: boolean;
  onClick?(index: number): void;
}

export const Faq = (props: FaqProps) => {
  return (
    <QuestionWrapper
      open={props.open === true}
      onClick={() => {
        props.onClick?.(props.index);
      }}
    >
      <QuestionTitleWrapper>
        <Question>{props.entry.question}</Question>{' '}
        <Chevron down={props.open === true} />
      </QuestionTitleWrapper>
      <Collapse isOpened={props.open === true}>
        <Answer>{props.entry.answer}</Answer>
      </Collapse>
    </QuestionWrapper>
  );
};

export const FaqPanel = (props: {entries: FAQEntry[]}) => {
  const [openEntry, setOpenEntry] = React.useState(0);

  return (
    <FaqWrapper>
      {props.entries.map((entry, index) => (
        <Faq
          key={`faq-${index}`}
          entry={entry}
          index={index}
          open={openEntry === index}
          onClick={setOpenEntry}
        />
      ))}
    </FaqWrapper>
  );
};
