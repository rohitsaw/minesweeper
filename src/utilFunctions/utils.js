export function getNoOfFlag(level) {
    if (!level) return 0;
    if (level === "Easy") return 10;
    if (level === "Medium") return 40;
    if (level === "Hard") return 99;
  }
  
  export function getNoOfBomb(level) {
    if (!level) return 0;
    if (level === "Easy") return 10;
    if (level === "Medium") return 40;
    if (level === "Hard") return 99;
  }


  export function getNoOfSquare(level){
    if (level === "Easy") return 8*10;
    if (level === "Medium") return 14*18;
    if (level === "Hard") return 20*24;
  }

  export function getNoOfRows(level){
    if (level === "Easy") return 8;
    if (level === "Medium") return 14;
    if (level === "Hard") return 20;
  }

  export function getNoOfColumns(level){
    if (level === "Easy") return 10;
    if (level === "Medium") return 18;
    if (level === "Hard") return 24;
  }

  export function getCellSize(level){
    if (level === 'Hard') return 24;
    if (level === 'Easy') return 48;
    if (level === 'Medium') return 36;
  }