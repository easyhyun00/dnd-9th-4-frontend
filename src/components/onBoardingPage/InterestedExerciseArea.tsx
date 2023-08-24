/** @jsxImportSource @emotion/react */
import UnselectedTag from 'components/common/UnselectedTag';
import { stackColumn, stackRow } from 'components/styles/common/common';
import { sport } from 'data/variable';
import React, { useState } from 'react';

const InterestedExerciseArea = ({
  onUpdateSelectedTags,
  defaultTags = [],
}: {
  onUpdateSelectedTags: (tags: string[]) => void;
  defaultTags?: string[];
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(defaultTags);

  const handleTagClick = (tag: string) => {
    let updateTags;
    if (selectedTags.includes(tag)) {
      updateTags = selectedTags.filter((t) => t !== tag);
    } else {
      updateTags = [...selectedTags, tag];
    }

    setSelectedTags(updateTags);
    onUpdateSelectedTags(updateTags);
  };

  return (
    <div css={stackColumn}>
      <div css={stackRow}>
        <UnselectedTag
          text="헬스"
          onClick={() => handleTagClick(sport['헬스'])}
          isSelected={selectedTags.includes(sport['헬스'])}
        />
        <UnselectedTag
          text="러닝"
          onClick={() => handleTagClick(sport['러닝'])}
          isSelected={selectedTags.includes(sport['러닝'])}
        />
        <UnselectedTag
          text="수영"
          onClick={() => handleTagClick(sport['수영'])}
          isSelected={selectedTags.includes(sport['수영'])}
        />
        <UnselectedTag
          text="등산"
          onClick={() => handleTagClick(sport['등산'])}
          isSelected={selectedTags.includes(sport['등산'])}
        />
      </div>
      <div css={stackRow}>
        <UnselectedTag
          text="사이클"
          onClick={() => handleTagClick(sport['사이클'])}
          isSelected={selectedTags.includes(sport['사이클'])}
        />
      </div>
    </div>
  );
};

export default InterestedExerciseArea;
