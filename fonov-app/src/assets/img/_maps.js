const sizeOf = require('image-size');


const fs = require('fs'),
    ignore = ['.DS_Store', '_maps.js', '_refactor.js', 'maps.json', '_ls_maps.js', '_rename_img.js'];


let maps = {};

const clean_file_name = name => {
    if (name.split('.').length === 2) {
        return name.split('.')[0];
    } else {
        return name
    }
};

const separate_dir = name => {
    let arr_dir = name.split(',');

    for (let [index, value] of arr_dir.entries()) {
        arr_dir[index] = value.trim()
    }

    return arr_dir
};

const prepare_img = file_path => {
    let dimensions = sizeOf(file_path);
    delete dimensions.type;
    return {
        src: file_path,
        ...dimensions
    }
};

const openFolder = (path, init=false) => {
    fs.readdir(path, (err, files) => {
        if (files && files.length) {
            files.forEach((file, index, arr) => {
                if (ignore.indexOf(file) === -1) {
                    const absolut_path = path[path.length-1] === '/' ? `${path}${file}`: `${path}/${file}`,
                        is_dir = fs.lstatSync(absolut_path).isDirectory();

                    let s_path = absolut_path.toLowerCase().slice(2, absolut_path.length),
                        file_path = absolut_path.slice(2, absolut_path.length);

                    if (init) {
                        maps[s_path] = {};
                    } else {
                        let dff = s_path.split('/');

                        if (dff.length === 2) {
                            let s_dir = separate_dir(dff[1]);
                            s_dir.forEach(item => {
                                maps[dff[0]][item] = {}
                            });
                        }
                        if (dff.length === 3) {
                            let s_dir = separate_dir(dff[1]);

                            let clean_name = clean_file_name(dff[2]);
                            s_dir.forEach(item => {
                                let dir_3 = clean_name.split(', ');
                                if (dir_3.length > 1) {
                                    dir_3.forEach(item_3 => maps[dff[0]][item][item_3.trim()] = is_dir ? {} : prepare_img(file_path))
                                } else {
                                    maps[dff[0]][item][clean_name] = is_dir ? {} : prepare_img(file_path)
                                }
                            });
                        }
                        if (dff.length === 4) {
                            let s_dir = separate_dir(dff[1]);

                            let clean_name = clean_file_name(dff[3]);
                            s_dir.forEach(item => {
                                let dir_3 = dff[2].split(', ');
                                if (dir_3.length > 1) {
                                    dir_3.forEach(item_3 => maps[dff[0]][item][item_3.trim()][clean_name] = is_dir ? {} : prepare_img(file_path))
                                } else {
                                    maps[dff[0]][item][dff[2]][clean_name] = is_dir ? {} : prepare_img(file_path)
                                }
                            });
                        }
                    }

                    if (fs.lstatSync(absolut_path).isDirectory()) {
                        openFolder(absolut_path)
                    }
                }
            });
        }
    });


};

openFolder('./', true);

setTimeout(() => {
    fs.writeFile("./maps.json", JSON.stringify(maps), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("Maps create\n\n" +
            "=========================\n\n" + JSON.stringify(maps));
    });
}, 1000);