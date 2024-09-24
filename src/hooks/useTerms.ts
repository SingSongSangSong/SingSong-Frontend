import {useState} from 'react';

type UseTermsProps = {
  provider: string;
  idToken: string;
};

const useTerms = ({provider, idToken}: UseTermsProps) => {
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isNextStep, setIsNextStep] = useState<boolean>(false);
  const [birthYear, setBirthYear] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [terms, setTerms] = useState({
    termsOfService: false,
    personalInfo: false,
    thirdPartyInfo: false,
    marketingInfo: false,
    locationInfo: false,
  });

  // 전체 동의 체크박스 눌렀을 때
  const handleAllChecked = (newValue: boolean) => {
    setIsAllChecked(newValue);
    setTerms({
      termsOfService: newValue,
      personalInfo: newValue,
      thirdPartyInfo: newValue,
      marketingInfo: newValue,
      locationInfo: newValue,
    });
  };

  // 개별 체크박스 변경 시
  const handleCheck = (key: keyof typeof terms, newValue: boolean) => {
    setTerms({...terms, [key]: newValue});

    const allSelected = Object.keys(terms).every(k =>
      k === key ? newValue : terms[k as keyof typeof terms],
    );
    setIsAllChecked(allSelected);
  };

  return {
    isAllChecked,
    isNextStep,
    birthYear,
    setBirthYear,
    gender,
    setGender,
    setIsNextStep,
    terms,
    handleAllChecked,
    handleCheck,
  };
};

export default useTerms;
