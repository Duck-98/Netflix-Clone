import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getMovies,
  getMoviesDetail,
  getMoviesPopular,
  getMoviesUpcoming,
  IGetDetailMoviesResult,
  IGetMoviesResult,
} from '../api';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { BsChevronCompactRight, BsChevronCompactLeft } from 'react-icons/bs';

const Wrapper = styled.div`
  background: black;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;
const Loader = styled.div`
  height: 200vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 24px;
  width: 50%;
`;
const BtnWrap = styled.div`
  position: absolute;
  right: 0px;
  cursor: pointer;
  display: flex;
  height: 200px;
  width: 40px;
  border: none;
  z-index: 2;
  color: rgb(229, 229, 229);
`;
const BtnWrapLeft = styled(BtnWrap)`
  left: 0px;
`;

const Button = styled(motion.button)`
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 50px;
  height: 100%;
  width: 40px;
  border: none;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 1;
  }
`;
const Slider = styled.div`
  position: relative;
  top: -100px;
  h2 {
    font-size: 20px;
    font-weight: bold;
  }
`;
const PopularSlider = styled(Slider)`
  top: 100px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  position: absolute;
  padding: 20px;
  width: 100%;
  bottom: 0;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
`;
const BigCover = styled.img`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center center;
`;
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 46px;
  padding: 20px;
  position: relative;
  top: -80px;
`;

const BigOverView = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;
const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      type: 'tween',
    },
  },
};

const InfoVariants = {
  hover: {
    opacity: 1,
    zIndex: 99,
    transition: {
      delay: 0.5,
      type: 'tween',
    },
  },
};
const rowVariants = {
  hidden: {
    x: window.outerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth,
  },
};

const buttonVariants = {
  normal: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    scale: 1,
  },
};

const offset = 6;

const Home = () => {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>('/movies/:movieId');
  const { scrollY } = useViewportScroll();
  const { data, isLoading } = useQuery<IGetMoviesResult>(['movies', 'nowPlaying'], getMovies);
  const movieId = bigMovieMatch?.params.movieId;
  const { data: detailMovieData, isLoading: detailMovieLoading } = useQuery<IGetDetailMoviesResult>(
    ['movies', 'detail', movieId],
    () => getMoviesDetail(movieId),
  );
  const { data: popularMovieData, isLoading: popularMovieLoading } = useQuery<IGetMoviesResult>(
    ['movies', 'popular'],
    getMoviesPopular,
  );
  const { data: upcommingMovieData, isLoading: upcommingMovieLoading } = useQuery<IGetMoviesResult>(
    ['movies', 'upcoming'],
    getMoviesUpcoming,
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      setLeaving(true);
      const totalMovies = data?.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };
  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };
  const onOverlayClick = () => {
    history.push('/');
  };

  const clickedMovie =
    bigMovieMatch?.params.movieId && data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);
  return (
    <>
      <Wrapper>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner onClick={increaseIndex} bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}>
              <Title>{data?.results[0].title}</Title>
              <Overview>{data?.results[0].overview}</Overview>
            </Banner>
            <Wrap>
              <Slider>
                <h2>상영중인 영화</h2>
                <BtnWrap>
                  <Button variants={buttonVariants} whileHover="hover" initial="normal">
                    <BsChevronCompactRight />
                  </Button>
                </BtnWrap>
                <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
                  <Row
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: 'tween', duration: 1 }}
                    key={index}
                  >
                    {data?.results
                      .slice(1)
                      .slice(offset * index, offset * index + offset)
                      .map((movie) => (
                        <Box
                          layoutId={movie.id + ''}
                          key={movie.id}
                          onClick={() => onBoxClicked(movie.id)}
                          whileHover="hover"
                          initial="normal"
                          variants={BoxVariants}
                          transition={{ type: 'tween' }}
                          bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
                        >
                          <img />
                          <Info variants={InfoVariants}>
                            <h4>{movie.title}</h4>
                          </Info>
                        </Box>
                      ))}
                  </Row>
                </AnimatePresence>
                <BtnWrapLeft>
                  <Button variants={buttonVariants} whileHover="hover" initial="normal">
                    <BsChevronCompactLeft />
                  </Button>
                </BtnWrapLeft>
              </Slider>
            </Wrap>
            <AnimatePresence>
              {/* movieId 속성이 없다고 뜨면 => bigMovieMatch의 movieId의 타입을 string으로 지정해주면 됨. */}
              {bigMovieMatch ? (
                <>
                  <Overlay onClick={onOverlayClick} exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
                  <BigMovie style={{ top: scrollY.get() + 100 }} layoutId={bigMovieMatch.params.movieId}>
                    {clickedMovie && (
                      <>
                        <BigCover
                          style={{
                            backgroundImage: `linear-gradient(to top, black,transparent),url(${makeImagePath(
                              clickedMovie.backdrop_path,
                              'w500',
                            )})`,
                          }}
                        />
                        <BigTitle>{detailMovieData?.title}</BigTitle>
                        <BigOverView>{detailMovieData?.release_date}</BigOverView>
                        <BigOverView>{detailMovieData?.overview}</BigOverView>
                        <BigOverView>{detailMovieData?.vote_average}</BigOverView>
                        <BigOverView>{detailMovieData?.overview}</BigOverView>
                      </>
                    )}
                  </BigMovie>
                </>
              ) : null}
            </AnimatePresence>
            <PopularSlider>
              <h2>개봉예정 영화</h2>
              <BtnWrap>
                <Button variants={buttonVariants} whileHover="hover" initial="normal">
                  <BsChevronCompactRight />
                </Button>
              </BtnWrap>
              <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: 'tween', duration: 1 }}
                  key={index}
                >
                  {upcommingMovieData?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <Box
                        layoutId={movie.id + ''}
                        key={movie.id}
                        onClick={() => onBoxClicked(movie.id)}
                        whileHover="hover"
                        initial="normal"
                        variants={BoxVariants}
                        transition={{ type: 'tween' }}
                        bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
                      >
                        <img />
                        <Info variants={InfoVariants}>
                          <h4>{movie.title}</h4>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
              <BtnWrapLeft>
                <Button variants={buttonVariants} whileHover="hover" initial="normal">
                  <BsChevronCompactLeft />
                </Button>
              </BtnWrapLeft>
            </PopularSlider>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Home;
