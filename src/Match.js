import React, { Component } from "react";

const TILE_COUNT = 10;

export default class Match extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tiles: [],
            lastFlipped: null, 
            clicks: 0
        };

        this.resetTiles = this.resetTiles.bind(this);
        this.flipTile = this.flipTile.bind(this);
    }

    flipTile(index) {
        let tiles = this.state.tiles;
        let tile = tiles[index];
        let clicks = this.state.clicks + 1;
        let lastFlipped = this.state.lastFlipped;

        if(lastFlipped === null) {
            tiles = this.flipAllBackOver(tiles);
            tile.flipped = !tile.flipped;
            lastFlipped = index;
        }else {
            tile.flipped = !tile.flipped;
            let lastFlippedTile = this.state.tiles[lastFlipped];

            if(lastFlippedTile.number === tile.number) {
                lastFlippedTile.matched = true;
                tile.matched = true;

                tiles[lastFlipped] = lastFlippedTile;
            }else{
                lastFlipped = null;
                tiles = this.flipAllBackOver(tiles);
                tile.flipped = !tile.flipped;
            }
            
        }

        tiles[index] = tile;
        this.setState({clicks, tiles, lastFlipped});
    }

    flipAllBackOver(tiles) {
        tiles.forEach(tile => {
            if(!tile.matched) {
                tile.flipped = true;
            }
        });
        return tiles;
    }

    renderTile(tile, index) {
        let classes = ["Tile"];

        if(tile.flipped) {
            classes = [...classes, "flipped"];
        }

        if(tile.matched) {
            classes = [...classes, "matched"];
        }

        let key = `tile-${index}`;

        return (
            <div key={key} className={classes.join(" ")} onClick={() => this.flipTile(index)}>
                {!tile.flipped && tile.number}
            </div>
        );
    }

    resetTiles() {
        let tiles = [];
        let number = 0;

        for(let i = 0; i < TILE_COUNT; i += 2) {
            number++;

            let tileOne = {flipped: true, matched: false, number};
            let tileTwo = {flipped: true, matched: false, number};

            tiles = [...tiles, tileOne, tileTwo];
        }

        for(let i = 0; i < tiles.length; i++) {
            const swapWidth = Math.floor(Math.random() * tiles.length);
            [tiles[i], tiles[swapWidth]] = [tiles[swapWidth], tiles[i]];
        }

        this.setState({clicks: 0, tiles});
    }

    render() {
        return (
            <div>
                <h1> Memory Game </h1>
                <strong>Clicks: {this.state.clicks}</strong>
                <br/>
                <button onClick={this.resetTiles} className="reset">New Game</button>
                <hr />
                {this.state.tiles.map((tile, index) => this.renderTile(tile, index))}
            </div>
        );
    }
}