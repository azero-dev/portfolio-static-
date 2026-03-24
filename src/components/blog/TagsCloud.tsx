'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TagData {
  tag: string;
  count: number;
}

interface TagsCloudProps {
  tags: TagData[];
  activeTag?: string;
  maxCount: number;
}

export function TagsCloud({ tags, activeTag, maxCount }: TagsCloudProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getTagSize = (count: number, maxCount: number) => {
    if (count > maxCount * 0.7) return 'text-base';
    if (count > maxCount * 0.4) return 'text-sm';
    return 'text-xs';
  };

  const visibleTags = isExpanded ? tags : tags.slice(0, 15);
  const hasMore = tags.length > 15;

  return (
    <div>
      <h3 className="font-mono text-lg font-bold mb-4">&gt;tags</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {visibleTags.map(({ tag, count }) => (
          <a
            key={tag}
            href={`/tag/${encodeURIComponent(tag)}`}
            className="inline-block"
          >
            <Badge
              variant={activeTag === tag ? 'default' : 'outline'}
              className={`font-mono ${getTagSize(count, maxCount)} hover:bg-accent hover:text-accent-foreground transition-colors ${
                activeTag === tag ? 'bg-primary text-primary-foreground' : ''
              }`}
            >
              {tag} ({count})
            </Badge>
          </a>
        ))}
      </div>
      
      {hasMore && (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full font-mono text-xs"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : `Show ${tags.length - 15} More Tags`}
        </Button>
      )}
    </div>
  );
}
