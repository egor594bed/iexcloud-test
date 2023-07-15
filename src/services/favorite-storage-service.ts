const storageName = "favoriteSymbols";

class FavoriteService {
  toggleFavoriteSymbol(symbol: string) {
    if (!localStorage.getItem(storageName))
      localStorage.setItem(storageName, "[]");
    let favoritsArr = this.getFavoriteSymbols();

    if (favoritsArr.includes(symbol)) {
      this.removeFavoriteSymbol(symbol);
    } else {
      this.addFavoriteSymbol(symbol);
    }
  }

  isFavorite(symbol: string) {
    let favoritsArr = this.getFavoriteSymbols();
    if (!favoritsArr) return false;
    return favoritsArr.includes(symbol) ? true : false;
  }

  getFavoriteSymbolsInObj(): { symbol: string }[] {
    const arr = JSON.parse(localStorage.getItem(storageName) as string);
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push({ symbol: arr[i] });
    }

    return newArr;
  }

  saveRotatedSymbols(symbolsArr: { symbol: string }[]) {
    let newArr = [];
    for (let i = 0; i < symbolsArr.length; i++) {
      newArr.push(symbolsArr[i].symbol);
    }

    this.saveFavoriteSymbols(newArr);
  }

  private getFavoriteSymbols() {
    return JSON.parse(localStorage.getItem(storageName) as string);
  }

  private removeFavoriteSymbol(symbol: string) {
    let favoritsArr = this.getFavoriteSymbols();

    let newfavoritsArr = favoritsArr.filter((elem: string) => {
      if (elem === symbol) return false;
      return true;
    });

    this.saveFavoriteSymbols(newfavoritsArr);
  }

  private addFavoriteSymbol(symbol: string) {
    let favoritsArr = this.getFavoriteSymbols();

    favoritsArr.push(symbol);
    this.saveFavoriteSymbols(favoritsArr);
  }

  private saveFavoriteSymbols(newFavoritsArr: string[]) {
    localStorage.setItem(storageName, JSON.stringify(newFavoritsArr));
  }
}

export default new FavoriteService();
