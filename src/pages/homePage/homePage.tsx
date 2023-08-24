/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import {
  HomeTopScreen,
  NewPleMateListBox,
  MatchingSchedule,
  Recommendation,
} from 'components/homePage/homePageComponents';
import {
  ButtonNavigation,
  Horizontalline,
} from 'components/common/commonComponents';
import { useNavigate } from 'react-router-dom';
import {
  getMatchingPostSimple,
  getMatchingRecord,
  getMateGround,
} from 'api/homePageApi';
import { useMutation } from 'react-query';

// // 맞춤 추천 테스트 데이터
// const mathcingPostsTestData = {
//   postList: [
//     {
//       id: 1,
//       title: '런닝 메이트 구해요',
//       sport: '런닝',
//       region: '대전광역시 유성구',
//       time: '18:30:00 - 21:00:00',
//       runtime: '08.15(화)',
//       image:
//         'https://cdn.pixabay.com/photo/2022/08/19/18/56/gym-7397553_1280.jpg',
//     },
//     {
//       id: 2,
//       title: '런닝 메이트 구해요',
//       sport: '런닝',
//       region: '대전광역시 유성구',
//       time: '18:30:00 - 21:00:00',
//       runtime: '08.15(화)',
//       image:
//         'https://cdn.pixabay.com/photo/2017/07/02/19/24/dumbbells-2465478_1280.jpg',
//     },
//     {
//       id: 3,
//       title: '같이 헬스다닐 분 구해요!',
//       sport: '헬스',
//       region: '인천광역시 남동구',
//       time: '18:30:00 - 21:00:00',
//       runtime: '08.15(화)',
//       image:
//         'https://cdn.pixabay.com/photo/2016/07/09/05/20/runner-1505712_1280.jpg',
//     },
//   ],
// };

// // 나의 매칭 일정 테스트 데이터
// const MatchingScheduleTestData = {
//   schduleList: [
//     {
//       id: 1,
//       memberId: 0,
//       dDay: 3, // 이거는 runtime이랑 new Date() 비교해서 구하기
//       runTime: '8월 6일(토)',
//       title: '같이 퇴근 후 헬스다닐 분 구해요',
//       region: '서울특별시 강남구',
//       sport: '헬스',
//     },
//     {
//       id: 2,
//       memberId: 0,
//       dDay: 5,
//       runTime: '8월 8일(월)',
//       title: '싸이클 같이 타요!!!!!',
//       region: '서울특별시 강남구',
//       sport: '싸이클',
//     },
//   ],
// };

function HomePage() {
  const navigate = useNavigate();

  // useState
  const [postList, setPostList] = useState([]);
  const [recordList, setRecordList] = useState([]);
  const [mateList, setMateList] = useState([]);

  console.log(postList, recordList, mateList);

  // 매칭 게시물 페이지로 이동동
  const onClickMatchingPostList = () => {
    navigate('/matching');
    window.scrollTo(0, 0);
  };

  // 매칭 일정 페이지로 이동
  const onClickMatchingScheduleList = () => {
    console.log('이동');
  };

  // API 호출
  const { mutate: post } = useMutation(() => getMatchingPostSimple(), {
    onSuccess: (data) => {
      setPostList(data);
    },
    onError: (error) => console.log(error),
  });

  const { mutate: record } = useMutation(() => getMatchingRecord(), {
    onSuccess: (data) => {
      setRecordList(data);
    },
    onError: (error) => console.log(error),
  });

  const { mutate: mate } = useMutation(() => getMateGround(), {
    onSuccess: (data) => {
      setMateList(data);
    },
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    post();
    record();
    mate();
  }, []);

  return (
    <div css={css({ marginInline: '16px', paddingBottom: '90px' })}>
      <HomeTopScreen nickname="뉴플" text="더운 여름 운동으로 이겨내요!" />
      <NewPleMateListBox matelist={mateList} />
      <MatchingSchedule
        onClickArrow={onClickMatchingScheduleList}
        nickname="뉴플"
        count={recordList.length}
        scheduleDataList={recordList}
      />
      <Horizontalline margin="40px" color="#EFF3FA" height="6px" />
      <Recommendation
        onClickArrow={onClickMatchingPostList}
        nickname="뉴플"
        postList={postList}
      />
      <ButtonNavigation />
    </div>
  );
}

export default HomePage;
