import styled from 'styled-components';

const Effects = styled.div`
  display: grid;
  grid-gap: 2rem;
  text-align: center;
`;

const Effect = styled.div`
  border: 1px solid var(--gray);
  border-radius: 4px;
  padding-bottom: 1rem;

  h3 {
    border-bottom: 1px solid var(--gray);
    padding: 0.5rem 0;
  }
`;

const EffectsList = styled.ul`
  display: grid;
  grid-template: auto / repeat(auto-fit, minmax(min(180px, 100%), 1fr));
  grid-gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin: 0;
    padding: 0;
  }
`;

const EffectStatistic = styled.span`
  color: var(--tf-blue);
  display: block;
  font-size: 1.2rem;
`;

export { Effects, Effect, EffectsList, EffectStatistic };
