interface Result {
    result: {
      input: {
        address: {
          address: string;
        };
        benchmark: {
          isDefault: boolean;
          benchmarkDescription: string;
          id: string;
          benchmarkName: string;
        };
      };
      addressMatches: {
        tigerLine: {
          side: string;
          tigerLineId: string;
        };
        coordinates: {
          x: number;
          y: number;
        };
        addressComponents: {
          zip: string;
          streetName: string;
          preType: string;
          city: string;
          preDirection: string;
          suffixDirection: string;
          fromAddress: string;
          state: string;
          suffixType: string;
          toAddress: string;
          suffixQualifier: string;
          preQualifier: string;
        };
        matchedAddress: string;
      }[];
    };
  }

  export default Result;