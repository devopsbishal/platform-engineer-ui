import { useEffect, useState } from 'react';
import { X, Plus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';

export type Tag = Record<string, string>;

interface TagsProps {
  maxTags?: number;
  value?: Tag[];
  onChange?: (tags: Tag[]) => void;
}

// const RESOURCE_TYPES = [
//   'Instance',
//   'Volumes',
//   'Elastic graphics',
//   'Spot Instance requests',
//   'Network interfaces',
// ] as const;

export function Tags({ maxTags = 50, value, onChange }: TagsProps) {
  const [tags, setTags] = useState<Tag[]>(value || []);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  // const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    setTags([...(value ?? [])]);
  }, [JSON.stringify(value)]);

  const addTag = () => {
    if (!newKey.trim() || !newValue.trim()) {
      toast.warning('Tag Validation Error', {
        description: 'Both key and value are required.',
      });
      return;
    }
  
    if (!(/^[A-Z]/.test(newKey))) {
      toast.error('Tag keys and values must start with an uppercase letter.', {
        description: 'Tag keys and values must start with an uppercase letter.',
      });
      return;
    }
  
    if (tags.length >= maxTags) {
      toast.error('Maximum Tags Reached', {
        description: `You can add up to ${maxTags} tags.`,
      });
      return;
    }
  
    if (tags.some((tag) => Object.keys(tag)[0] === newKey)) {
      toast.error('Duplicate Key Error', {
        description: `The key "${newKey}" already exists.`,
      });
      return;
    }
  
    const newTag = { [newKey]: newValue };
  
    setTags((prevTags) => {
      const updatedTags = [...prevTags, newTag];
      onChange?.(updatedTags);
      return updatedTags;
    });
  
    setNewKey('');
    setNewValue('');
  };
  

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onChange?.(newTags);
  };

  return (
    <div className='w-full space-y-4'>
      <div className='flex flex-col space-y-2'>
        <div className='flex items-center justify-between'>
          <h3 className='text-base font-semibold'>Name and tags</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='h-6 w-6'
                >
                  <Info className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add tags to organize and track your resources</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {(tags ?? []).map((tag, index) => {
        const key = Object.keys(tag)[0];
        const value = tag[key];
        return (
          <div
            key={`${key}-${index}`}
            className='flex flex-wrap gap-4 p-4 rounded-lg items-end border bg-card'
          >
            <div className='flex-1 min-w-[150px]'>
              <label className='text-sm font-medium'>Key</label>
              <Input value={key} readOnly />
            </div>
            <div className='flex-1 min-w-[150px]'>
              <label className='text-sm font-medium'>Value</label>
              <Input value={value} readOnly />
            </div>
            {/* <div className='flex-1 min-w-full md:min-w-[200px]'>
              <label className='text-sm font-medium'>Resource types</label>
              <Input
                // value={tag.resourceTypes.join(', ') || 'All resources'}
                readOnly
              />
            </div> */}
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={() => removeTag(index)}
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        );
      })}

      <div className='flex flex-wrap items-end gap-4 p-4 rounded-lg border border-dashed'>
        <div className='flex-1 min-w-[150px]'>
          <label className='text-sm font-medium'>Key</label>
          <Input
            placeholder='Enter key'
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
          />
        </div>

        <div className='flex-1 min-w-[150px]'>
          <label className='text-sm font-medium'>Value</label>
          <Input
            placeholder='Enter value'
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        </div>

        {/* <div className='w-full flex flex-wrap gap-2'>
          {selectedTypes.map((type) => (
            <div
              key={type}
              className='flex items-center gap-2 px-2 py-1 rounded-md border bg-muted'
            >
              <span>{type}</span>
              <X
                className='h-4 w-4 cursor-pointer'
                onClick={() =>
                  setSelectedTypes((prev) => prev.filter((t) => t !== type))
                }
              />
            </div>
          ))}
        </div> */}

        {/* <div className='w-full'>
          <Select
            onValueChange={(value) =>
              setSelectedTypes((prev) => [...new Set([...prev, value])])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select resource type' />
            </SelectTrigger>
            <SelectContent>
              {RESOURCE_TYPES.map((type) => (
                <CustomSelectItem
                  key={type}
                  value={type}
                  selected={selectedTypes.includes(type)}
                >
                  {type}
                </CustomSelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}

        <Button
          type='button'
          variant='outline'
          size='icon'
          onClick={addTag}
          className='ml-auto'
        >
          <Plus className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
