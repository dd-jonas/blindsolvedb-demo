import { useEffect, useState } from 'react';

export const useSupportedFeatures = () => {
  const [checked, setChecked] = useState(false);

  const [supports, setSupports] = useState<Record<string, boolean>>({
    regexLookbehind: false,
  });

  useEffect(() => {
    // Regex Lookbehind check
    try {
      const re = new RegExp('(?<=abc)def');
      re.test('abcdef');

      setSupports((prev) => ({ ...prev, regexLookbehind: true }));
    } catch (_) {
      setSupports((prev) => ({ ...prev, regexLookbehind: false }));
    }

    setChecked(true);
  }, []);

  return {
    isChecking: !checked,
    isSupported: Object.values(supports).every((v) => v),
  };
};
