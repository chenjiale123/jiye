 export  default{
    getArrEqual(arr1, arr2) {
      
        console.log(arr1,arr2)
        var a;
        let newArr = [];
        for (let i = 0; i < arr1.length; i++) {
          for (let j = 0; j < arr2.length; j++) {
            if (i == 0) {
              if (arr1[i] == arr2[j]) {
                console.log(this.weeklist1[i].usage);
                console.log(j + "1111111111111");
                a = j;
                newArr[a] = this.weeklist1[i].usage;
                console.log(a + "3333333");
              } else {
                newArr[j] = 0;
              }
            }
    
            if (i > 0) {
              
              if (arr1[i] == arr2[j]) {
    
                  newArr[j] = this.weeklist1[i].usage;
                  console.log(j + "222222222222");
                  a = j;
                  console.log(a + "444444444444");
    
              }
            }
          }
        }
        return newArr;
      }
 }