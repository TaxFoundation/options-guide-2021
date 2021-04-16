import React, { useState } from 'react';
import styled from 'styled-components';

const ChapterSelectContainer = styled.div`
  border-bottom: 1px solid #ccc;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-bottom: 1rem;
`;

const ChapterSelect = styled.button`
  background: none;
  border: none;
  border-radius: 0;
  color: ${props => (props.active ? '#333' : '#666')};
  font-family: 'Lato', sans-serif;
  font-size: 0.8rem;
  font-weight: ${props => (props.active ? 700 : 400)};
  margin-bottom: -1px;
  padding: 0.5rem 0;
  position: relative;
  text-transform: uppercase;
  transition: color 0.2s ease-in-out, font-weight 0.2s ease-in-out;

  &::after {
    background-color: ${props => props.color};
    bottom: 0;
    content: '';
    height: ${props => (props.active ? '3px' : 0)};
    left: 0;
    position: absolute;
    right: 0;
  }

  &:hover {
    background: none;
    border: none;
    color: #333;
    font-weight: 700;

    &::after {
      height: 3px;
    }
  }
`;

const ListOfOptions = styled.ul`
  @media screen and (min-width: 500px) {
    column-count: 3;
  }

  li {
    color: #0094ff;
    cursor: pointer;
    font-size: 0.8rem;
    text-decoration: underline;
  }
`;

const text = {
  home: [
    'The economic crisis caused by the coronavirus pandemic poses a triple challenge for tax policy in the United States. Lawmakers are tasked with crafting a policy response that will accelerate the economic recovery, reduce the mounting deficit, and protect the most vulnerable.',
    'To assist lawmakers in navigating the challenge, and to help the American public understand the tax changes being proposed, we’ve assembled a collection of 70 Options for Reforming America’s Tax Code. Our team of economists has modeled the effects of each option on the U.S. economy, distribution of the tax burden, and federal revenue.',
    'In tax policy there is an ever-present trade-off among how much revenue a tax will raise, who bears the burden of a tax, and what impact a tax will have on economic growth. Armed with the information in this guide, policymakers can debate the relative merits and trade-offs of each option to improve the tax code in a post-pandemic world.',
    'Select an option below to explore its economic, budgetary, and distributional impacts, or access a printable version of the full Options guide at the link below.',
  ],
  1: [
    'If lawmakers solely rely on policies designed to stimulate short-run economic growth and provide liquidity to households and businesses, they risk producing only short-term results and an anemic long-term recovery. While immediate relief is warranted, permanent improvements to tax policy offer an effective means for promoting work, investment, and capital formation over the long term.',
    'To be effective in promoting economic recovery, federal tax policy changes must be made on a permanent basis to improve long-term incentives. Temporary improvements would not provide adequate time to recoup the cost of major investments nor the certainty needed to engage in long-term decision-making. Moreover, short-term policy changes can increase uncertainty—undermining capital spending and new investment as a general matter.',
    'Broadly speaking, permanent improvements to the tax code can clear the path to economic recovery through one of two main channels. First, tax policy can change people’s incentives to work, affecting the supply of labor. Second, tax policy can change people’s incentives to save and invest, affecting the supply of capital. Higher supplies of labor and capital lead to a larger economy.',
    'In most cases, such improvements would not require a new set of policies—just the removal of obstacles that stand in the way of work and investment. Chapter 1 outlines 13 options lawmakers might consider for improving policies across individual, business, payroll, and excise taxes.',
  ],
  2: [
    'Prior to the pandemic-induced recession, the federal budget faced structural deficits that would become unsustainable over the long term. The fiscal response to the pandemic and recession drastically increased the budget deficit in 2020 and 2021. Even after the fiscal response and short-term effects of the pandemic fade, spending growth is set to well outpace revenue growth due to structural deficits driven by demographics, entitlement spending, and interest costs.',
    'While the nascent recovery is not the appropriate time to engage in deficit-reduction efforts, particularly given that low interest rates imply ample room for a continuing fiscal policy response, lawmakers will eventually turn their attention toward addressing deficits.',
    'It will be important that if, or more likely when, lawmakers look for ways to raise tax revenues, they keep in mind that tax increases come with trade-offs in terms of effects on economic output and revenue-raising potential.',
    'Once the public health threat is mitigated and the economy has recovered, considering such trade-offs will help lawmakers avoid tax increases that would cause undue harm to the economy by reducing incentives to work and invest. In general, taxes on more mobile factors of production, such as capital, cause more distortions to economic incentives than taxes on less mobile factors, such as labor.',
    'This chapter compares 37 changes to federal taxes on individual income, business income, payroll, select sales (excises), and estates and gifts.',
  ],
  3: [
    'While recessions usually hurt a broad swath of households, the pandemic-induced shutdowns and recession hit lower-income households disproportionately when compared to previous recessions, especially those with school-age children. At its height, approximately 20 million workers lost their jobs with losses heavily concentrated in tourism, food service, and related sectors. Though the ongoing recovery has seen more than half of jobs return, the gains have not been proportional across the income scale.',
    'Concerns about protecting low-income or other vulnerable populations are often conflated with broader concerns about increasing the overall progressivity of the tax code or raising the tax burden on wealthy households. Rather than take that approach, the options here outline changes to provisions targeted to populations in need.',
    'For many low-income households, payroll taxes comprise a larger share of their tax burden than individual income taxes do. Further, many lower-income households face negative effective income tax rates, as refundable tax credits such as the Child Tax Credit (CTC) and Earned Income Tax Credit (EITC) fully offset tax liability and result in tax refunds. In tax year 2018, more than 39 million tax returns claimed the CTC and more than 26 million returns claimed the EITC.',
    'While strong economic growth—fueled by higher levels of investment, productivity, and jobs—will lift after-tax incomes over time, policies that provide relief by immediately boosting after-tax incomes of lower-income households are also available. To that end, the following chapter illustrates the economic, revenue, and distributional implications of eight changes to tax provisions that affect vulnerable populations.',
  ],
  4: [
    'Outside of changes aimed at returning to growth, reducing budget deficits, and aiding vulnerable households, the tax code could be simplified and improved. Major, structural tax reform does not happen often and tends to be a once-in-a-generation event. Between major reforms, the tax code tends to get more complex, not less.',
    'Some of the changes in this chapter would improve the horizontal equity of the tax code, moving towards applying the same set of rules for taxpayers that are in similar situations. For example, repealing the individual alternative minimum tax (AMT) would eliminate a second structure under which certain taxpayers face different rules. Implementing full expensing for all capital investments would equalize tax treatment of the different types of costs businesses incur.',
    'The tax code also contains many temporary provisions, which requires taxpayers to frequently check the tax code for changes. Some of the changes in this chapter would improve the stability of the tax code by eliminating temporary tax expenditures and making other components of the tax code permanent.',
    'This chapter illustrates the economic, revenue, and distributional effects of 12 simplifications to the tax code that lawmakers could consider.',
  ],
};

const Chapters = ({ chapter, setChapter, options, setOption }) => {
  return (
    <div>
      <ChapterSelectContainer>
        <ChapterSelect
          color="#333"
          active={chapter === 'home'}
          onClick={() => setChapter('home')}
        >
          Home
        </ChapterSelect>
        <ChapterSelect
          color="rgb(51, 122, 189)"
          active={chapter === 1}
          onClick={() => setChapter(1)}
        >
          Returning to Growth
        </ChapterSelect>
        <ChapterSelect
          color="rgb(64, 148, 136)"
          active={chapter === 2}
          onClick={() => setChapter(2)}
        >
          Reducing the Deficit
        </ChapterSelect>
        <ChapterSelect
          color="rgb(245, 195, 70)"
          active={chapter === 3}
          onClick={() => setChapter(3)}
        >
          Protecting the Vulnerable
        </ChapterSelect>
        <ChapterSelect
          color="rgb(206, 76, 61)"
          active={chapter === 4}
          onClick={() => setChapter(4)}
        >
          Simplifying the Tax Code
        </ChapterSelect>
      </ChapterSelectContainer>
      <div>
        {text[chapter].map((para, i) => (
          <p key={`${chapter}-${i}`}>{para}</p>
        ))}
        {chapter !== 'home' && (
          <ListOfOptions>
            {options
              .filter(opt => opt.category === chapter)
              .map(opt => (
                <li role="button" onClick={() => setOption(+opt.id)}>
                  {opt.title}
                </li>
              ))}
          </ListOfOptions>
        )}
      </div>
    </div>
  );
};

export default Chapters;
