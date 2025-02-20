import { NumberInput as ChakraNumberInput } from '@chakra-ui/react';
import * as React from 'react';

export const NumberInputRoot = React.forwardRef(
  function NumberInput(props, ref) {
    const { children, onIncrement, onDecrement, ...rest } = props;
    return (
      <ChakraNumberInput.Root ref={ref} variant='outline' {...rest}>
        {children}
        <ChakraNumberInput.Control>
          <ChakraNumberInput.IncrementTrigger onClick={onIncrement} />
          <ChakraNumberInput.DecrementTrigger onClick={onDecrement} />
        </ChakraNumberInput.Control>
      </ChakraNumberInput.Root>
    );
  },
);

export const NumberInputField = ChakraNumberInput.Input;
export const NumberInputScrubber = ChakraNumberInput.Scrubber;
export const NumberInputLabel = ChakraNumberInput.Label;