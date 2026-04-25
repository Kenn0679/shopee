import React from 'react'
import { Button } from '~/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'

export default function SortProductList() {
  return (
    <div className='bg-secondary py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          {/* Sort option */}
          <Button className='h-8 px-4 bg-primary text-primary-foreground text-sm hover:bg-primary/80 text-center'>
            Phổ biến
          </Button>
          <Button className='h-8 px-4 bg-primary-foreground text-muted-foreground text-sm hover:bg-primary/80 hover:text-primary-foreground text-center'>
            Bán chạy
          </Button>
          <Select>
            <SelectTrigger className='h-8 px-4 capitalize bg-primary-foreground text-muted-foreground text-sm hover:bg-accent hover:text-muted-foreground text-center border'>
              <SelectValue placeholder='Giá' />
            </SelectTrigger>
            <SelectContent position='popper'>
              <SelectGroup>
                <SelectLabel>Giá</SelectLabel>
                <SelectItem value='price:asc'>Giá: Thấp đến Cao</SelectItem>
                <SelectItem value='price:desc'>Giá: Cao đến Thấp</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Pagination */}
        <div className='flex items-center'>
          <div>
            <span className='text-primary'>1</span>
            <span className='text-muted-foreground'>/9</span>
          </div>
          <div className='ml-2'>
            <Button
              className='px-3 h-8 rounded-tl-sm rounded-bl-sm bg-primary-foreground/60 hover:bg-background cursor-not-allowed text-muted-foreground text-sm mr-0'
              disabled
              size={'sm'}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
              </svg>
            </Button>
            <Button
              className='px-3 h-8 rounded-tr-sm rounded-br-sm bg-primary-foreground/60 hover:bg-background  text-muted-foreground ml-0'
              size={'sm'}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
