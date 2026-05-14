/*==========================================================================
 NLM_PictureFolderMZ.js
----------------------------------------------------------------------------
 (C)2025 NoLimits
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2025/10/19 初版
============================================================================*/

/*:
 * @target MZ
 * @plugindesc ピクチャのフォルダ指定プラグイン
 * @author ノリミツ(NoLimits)
 * @url https://github.com/nolimits-tukool
 * 
 * @help 
 * 
 * 【RPGツクールMZ専用プラグイン】 (v1.0.0)
 * 「ピクチャの表示」で、picturesフォルダ以外のフォルダを指定できます
 * 
 * 次の手順で使用してください
 * 　1. プラグインコマンドで「NLM_PictureFolderMZ」を呼び出す
 * 　2.「コマンド名」で使いたい画像の「フォルダ」を指定
 * 　3.「引数」で使いたい画像の「ファイル名」などを選択
 * 　4.「OK」を押す
 * 　5. 画像を指定せずに「ピクチャの表示」を実行
 * 
 * ※ デフォルト画像のみ利用のサンプルプロジェクト用に開発
 * ※ ぶっちゃけ、他フォルダの画像をpicturesフォルダへも複製すればよいだけの話
 * 　なんですが、無駄な画像ファイル容量を節減できる利点があります
 * 　 また、characters, faces, sv_actors, systemフォルダでは画像の一要素だけを
 * 　選択して表示できる機能を付けてあります
 * 
 * 利用規約はMITライセンスの通りです
 * 
 * @command setB1
 * @text battlebacks1フォルダ指定
 * @desc ここで指定直後に、画像を指定せず「ピクチャの表示」を実行して下さい
 *
 * @arg fileName
 * @type file
 * @dir img/battlebacks1
 * @text battlebacks1画像指定
 * @desc battlebacks1フォルダの画像指定
 * 
 * @command setB2
 * @text battlebacks2フォルダ指定
 * @desc ここで指定直後に、画像を指定せず「ピクチャの表示」を実行して下さい
 * 
 * @arg fileName
 * @type file
 * @dir img/battlebacks2
 * @text battlebacks2画像指定
 * @desc battlebacks2フォルダの画像指定
 * 
 * @command setCh
 * @text charactersフォルダ指定
 * @desc ここで指定直後に、画像を指定せず「ピクチャの表示」を実行して下さい
 * 
 * @arg fileName
 * @type file
 * @dir img/characters
 * @text characters画像指定
 * @desc charactersフォルダの画像指定
 * 
 * @arg index1
 * @type number
 * @text キャラ別の番号
 * @desc キャラ別の番号（上段：1-4、下段：5-8、全て：0）
 * @default 0
 * @max 8
 * 
 * @arg index2
 * @type number
 * @text 向き別の番号
 * @desc 向き別の番号（上段1-3、中上段4-6、中下段7-9、下段10-12、全て：0）
 * @default 0
 * @max 12
 * 
 * @arg smooth
 * @type boolean
 * @text スムーズ処理
 * @desc スムーズ処理（デフォルト：OFF）（ON時は画像が2ドット縮む）
 * @default false
 * 
 * @command setEf
 * @text enemiesフォルダ指定
 * @desc ここで指定直後に、画像を指定せず「ピクチャの表示」を実行して下さい
 * 
 * @arg fileName
 * @type file
 * @dir img/enemies
 * @text enemies画像指定
 * @desc enemiesフォルダの画像指定
 * 
 * @arg hue
 * @type number
 * @text 色相値
 * @desc 色相値（-360～360）（デフォルト：0）
 * @default 0
 * @min -360
 * @max 360
 * 
 * @command setFc
 * @text facesフォルダ指定
 * @desc ここで指定直後に、画像を指定せず「ピクチャの表示」を実行して下さい
 * 
 * @arg fileName
 * @type file
 * @dir img/faces
 * @text faces画像指定
 * @desc facesフォルダの画像指定
 * 
 * @arg index
 * @type number
 * @text 顔画像の位置
 * @desc 顔画像の位置番号（上段：1-4、下段：5-8、全て：0）
 * @default 0
 * @max 8
 * 
 * @arg smooth
 * @type boolean
 * @text スムーズ処理
 * @desc スムーズ処理（デフォルト：ON）（ON時は画像が2ドット縮む）
 * @default true
 * 
 * @command setPx
 * @text parallaxesフォルダ指定
 * @desc ここで指定直後に、画像を指定せず「ピクチャの表示」を実行して下さい
 * 
 * @arg fileName
 * @type file
 * @dir img/parallaxes
 * @text parallaxes画像指定
 * @desc parallaxesフォルダの画像指定
 * 
 * @command setAs
 * @text sv_actorsフォルダ指定
 * @desc ここで指定直後に、画像を指定せず「ピクチャの表示」を実行して下さい
 * 
 * @arg fileName
 * @type file
 * @dir img/sv_actors
 * @text sv_actors画像指定
 * @desc sv_actorsフォルダの画像指定
 * 
 * @arg index1
 * @type number
 * @text ヨコ順番号
 * @desc 横9×縦6の格子構造で、最初を1として、左から数える。0の場合は全部
 * @default 0
 * @max 9
 * 
 * @arg index2
 * @type number
 * @text タテ順番号
 * @desc 横9×縦6の格子構造で、最初を1として、上から数える
 * @default 1
 * @min 1
 * @max 6
 * 
 * @arg smooth
 * @type boolean
 * @text スムーズ処理
 * @desc スムーズ処理（デフォルト：ON）（ON時は画像が2ドット縮む）
 * @default true
 * 
 * @command setEs
 * @text sv_enemiesフォルダ指定
 * @desc ここで指定直後に、画像を指定せず「ピクチャの表示」を実行して下さい
 * 
 * @arg fileName
 * @type file
 * @dir img/sv_enemies
 * @text sv_enemies画像指定
 * @desc sv_enemiesフォルダの画像指定
 * 
 * @arg hue
 * @type number
 * @text 色相値
 * @desc 色相値（-360～360）（デフォルト：0）
 * @default 0
 * @min -360
 * @max 360
 * 
 * @command setSy
 * @text systemフォルダ指定
 * @desc ここで指定直後に、画像を指定せず「ピクチャの表示」を実行して下さい
 * 
 * @arg fileName
 * @type file
 * @dir img/system
 * @text system画像指定
 * @desc systemフォルダの画像指定
 * 
 * @arg horDiv
 * @type number
 * @text ヨコ分割数
 * @desc ヨコ分割数（デフォルト：0）（0の場合は全部）
 * @default 0
 * 
 * @arg verDiv
 * @type number
 * @text タテ分割数
 * @desc タテ分割数（デフォルト：1）
 * @default 1
 * @min 1
 * 
 * @arg index
 * @type number
 * @text 順番号
 * @desc 順番号（上記分割格子構造で、最初を1として、横から数える）
 * @default 1
 * @min 1
 * 
 * @arg iconId
 * @type number
 * @text アイコン番号
 * @desc アイコン番号（「IconSet.png」を指定した時のみ利用、上記分割指定は無効となる）
 * @default 0
 * 
 * @arg smooth
 * @type boolean
 * @text スムーズ処理
 * @desc スムーズ処理（デフォルト：OFF）（ONかつ分割画像にすると辺縁に線が出る場合あり）
 * @default false
 * 
 * @command setT1
 * @text titles1フォルダ指定
 * @desc ここで指定直後に、画像を指定せず「ピクチャの表示」を実行して下さい
 * 
 * @arg fileName
 * @type file
 * @dir img/titles1
 * @text titles1画像指定
 * @desc titles1フォルダの画像指定
 * 
 * @command setT2
 * @text titles2フォルダ指定
 * @desc ここで指定直後に、画像を指定せず「ピクチャの表示」を実行して下さい
 * 
 * @arg fileName
 * @type file
 * @dir img/titles2
 * @text titles2画像指定
 * @desc titles2フォルダの画像指定
 * 
 */


(() => {
    "use strict";

    const pluginName = "NLM_PictureFolderMZ";

    ImageManager.NLPFclear = function() {
        this._NLPFfile   = null;
        this._NLPFfolder = null;
        this._NLPFhorDiv = 0;
        this._NLPFverDiv = 0;
        this._NLPFindex  = 0;
        this._NLPFsmooth = 0;
    };

    PluginManager.registerCommand(pluginName, "setB1", args => {
        ImageManager.NLPFclear();
        ImageManager._NLPFfile   = args.fileName;
        ImageManager._NLPFfolder = "battlebacks1";
    });

    PluginManager.registerCommand(pluginName, "setB2", args => {
        ImageManager.NLPFclear();
        ImageManager._NLPFfile   = args.fileName;
        ImageManager._NLPFfolder = "battlebacks2";
    });

    PluginManager.registerCommand(pluginName, "setCh", args => {
        ImageManager.NLPFclear();
        const index1 = Number(args.index1) || 0;
        const index2 = Number(args.index2) || 0;
        const indM1  = index1 - 1;
        const indM2  = index2 - 1;
        const indTot = Math.floor(indM1 / 4) * 48 + Math.floor(indM2 / 3) * 12
                      + Math.floor(indM1 % 4) * 3 + Math.floor(indM2 % 3);
        ImageManager._NLPFfile   = args.fileName;
        ImageManager._NLPFfolder = "characters";
        ImageManager._NLPFhorDiv = index1 && !index2 ? 4 : (!index1 && index2 ? 3 : (index1 && index2 ? 12 : 0));
        ImageManager._NLPFverDiv = index1 && !index2 ? 2 : (!index1 && index2 ? 4 : 8);
        ImageManager._NLPFindex  = index1 ? (index2 ? indTot : indM1) : indM2;
        ImageManager._NLPFsmooth = (args.smooth === "true") ? 1 : 0;
    });

    PluginManager.registerCommand(pluginName, "setEf", args => {
        ImageManager.NLPFclear();
        ImageManager._NLPFfile   = args.fileName;
        ImageManager._NLPFfolder = "enemies";
        ImageManager._NLPFindex  = Number(args.hue) || 0;
    });

    PluginManager.registerCommand(pluginName, "setFc", args => {
        ImageManager.NLPFclear();
        const index = Number(args.index) || 0;
        ImageManager._NLPFfile   = args.fileName;
        ImageManager._NLPFfolder = "faces";
        ImageManager._NLPFhorDiv = index ? 4 : 0;
        ImageManager._NLPFverDiv = 2;
        ImageManager._NLPFindex  = index - 1;
        ImageManager._NLPFsmooth = (args.smooth === "true") ? 1 : 0;
    });

    PluginManager.registerCommand(pluginName, "setPx", args => {
        ImageManager.NLPFclear();
        ImageManager._NLPFfile   = args.fileName;
        ImageManager._NLPFfolder = "parallaxes";
    });

    PluginManager.registerCommand(pluginName, "setAs", args => {
        ImageManager.NLPFclear();
        const index1 = Number(args.index1) || 0;
        const index2 = Number(args.index2) || 1;
        const indM1  = index1 - 1;
        const indM2  = index2 - 1;
        ImageManager._NLPFfile   = args.fileName;
        ImageManager._NLPFfolder = "sv_actors";
        ImageManager._NLPFhorDiv = index1 ? 9 : 0;
        ImageManager._NLPFverDiv = index1 ? 6 : 0;
        ImageManager._NLPFindex  = index1 ? indM1 + indM2 * 9 : 0
        ImageManager._NLPFsmooth = (args.smooth === "true") ? 1 : 0;
    });

    PluginManager.registerCommand(pluginName, "setEs", args => {
        ImageManager.NLPFclear();
        ImageManager._NLPFfile   = args.fileName;
        ImageManager._NLPFfolder = "sv_enemies";
        ImageManager._NLPFindex  = Number(args.hue) || 0;
    });

    PluginManager.registerCommand(pluginName, "setSy", args => {
        ImageManager.NLPFclear();
        ImageManager._NLPFfile = args.fileName;
        if (args.fileName === "IconSet") {
            ImageManager._NLPFfolder = "icon";
            ImageManager._NLPFindex  = Number(args.iconId) || 0;
        } else {
            ImageManager._NLPFfolder = "system";
            ImageManager._NLPFhorDiv = Number(args.horDiv) || 0;
            ImageManager._NLPFverDiv = Number(args.verDiv) || 1;
            ImageManager._NLPFindex  = Number(args.index || 1) - 1;
        }
        ImageManager._NLPFsmooth = (args.smooth === "true") ? 1 : 0;
    });

    PluginManager.registerCommand(pluginName, "setT1", args => {
        ImageManager.NLPFclear();
        ImageManager._NLPFfile   = args.fileName;
        ImageManager._NLPFfolder = "titles1";
    });

    PluginManager.registerCommand(pluginName, "setT2", args => {
        ImageManager.NLPFclear();
        ImageManager._NLPFfile   = args.fileName;
        ImageManager._NLPFfolder = "titles2";
    });

    const _Game_Picture_show = Game_Picture.prototype.show;
    Game_Picture.prototype.show = function() {
        _Game_Picture_show.apply(this, arguments);
        if (this._name === "" && ImageManager._NLPFfile) {
            this._NLPFfile   = ImageManager._NLPFfile;
            this._NLPFfolder = ImageManager._NLPFfolder;
            this._NLPFhorDiv = ImageManager._NLPFhorDiv;
            this._NLPFverDiv = ImageManager._NLPFverDiv;
            this._NLPFindex  = ImageManager._NLPFindex;
            this._NLPFsmooth = ImageManager._NLPFsmooth;
            this._name = this._NLPFfile;
            ImageManager.NLPFclear();
        }
    };

    Game_Picture.prototype.NLPFfile   = function() {
        return this._NLPFfile;
    };

    Game_Picture.prototype.NLPFfolder = function() {
        return this._NLPFfolder;
    };

    Game_Picture.prototype.NLPFhorDiv = function() {
        return this._NLPFhorDiv;
    };

    Game_Picture.prototype.NLPFverDiv = function() {
        return this._NLPFverDiv;
    };

    Game_Picture.prototype.NLPFindex  = function() {
        return this._NLPFindex;
    };

    Game_Picture.prototype.NLPFsmooth = function() {
        return this._NLPFsmooth;
    };

    const _Sprite_Picture_loadBitmap = Sprite_Picture.prototype.loadBitmap;
    Sprite_Picture.prototype.loadBitmap = function() {
        const pic  = this.picture();
        const file = pic.NLPFfile();
        if (pic && file) {
            this.NLPFloadBitmap(pic, file);
        } else {
            _Sprite_Picture_loadBitmap.apply(this, arguments);
        }
    };

    Sprite_Picture.prototype.NLPFloadBitmap = function(pic, file) {
        const iconOn = pic.NLPFfolder() === "icon";
        const folder = iconOn ? "system" : pic.NLPFfolder();
        const bitmap = ImageManager.loadBitmap("img/" + folder + "/", file);
        bitmap.addLoadListener(function() {
            this.bitmap  = bitmap;
            const index  = pic.NLPFindex();
            const icDiv  = Math.floor(bitmap.height / ImageManager.iconHeight);
            const horDiv = iconOn ? 16    : pic.NLPFhorDiv();
            const verDiv = iconOn ? icDiv : pic.NLPFverDiv();
            if (horDiv) {
                const smooth = pic.NLPFsmooth();
                this.bitmap.smooth = smooth;
                const w  = bitmap.width  / horDiv;
                const h  = bitmap.height / verDiv;
                const sx = index % horDiv * w;
                const sy = Math.floor(index / horDiv) * h;
                const dx = folder === "system" ? 0 : smooth;
                this.setFrame(sx+dx, sy+dx, w-2*dx, h-2*dx);
            }
            if (folder === "enemies" || folder === "sv_enemies") {
                this.setHue(index);
            }
        }.bind(this));
    };
})();