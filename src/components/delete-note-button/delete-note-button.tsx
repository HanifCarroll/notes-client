import React from 'react';
import {
  Button,
  Popover,
  PopoverArrow, PopoverBody,
  PopoverCloseButton,
  PopoverContent, PopoverFooter,
  PopoverHeader,
  PopoverTrigger
} from '@chakra-ui/core';

export const DeleteButton = ({ deleteNote }) => (
  <Popover usePortal>
    <PopoverTrigger>
      <button>Delete</button>
    </PopoverTrigger>
    <PopoverContent zIndex={4}>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader>Confirmation</PopoverHeader>
      <PopoverBody>
        Are you sure you want to delete this note?
      </PopoverBody>
      <PopoverFooter d="flex" justifyContent="flex-end">
        <Button size="sm" variantColor="red" onClick={deleteNote}>Yes</Button>
      </PopoverFooter>
    </PopoverContent>
  </Popover>
);
