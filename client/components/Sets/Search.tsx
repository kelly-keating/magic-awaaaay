import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'

interface Props {
  changeSearch: (str: string) => void
}

function Search({ changeSearch }: Props) {
  return (
    <>
      <label htmlFor="search">Search:</label>
      <InputGroup size="md">
        <Input
          id="search"
          pr="4.5rem"
          placeholder="Enter set"
          onChange={(e) => changeSearch(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={() => changeSearch('')}>
            Clear
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  )
}

export default Search
