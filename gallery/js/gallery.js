function PageViewModel() {
	var self = this;
	self.photos = ko.observableArray();
}

function AssetViewModel(name, width, height, url) {

	this.name = name;
	this.height = height;
	this.width = width;
	this.aspectRatio = width/height;
	this.displayWidth = ko.observable(0);
	this.displayHeight = ko.observable(0);

	this.displayWidthCss = ko.pureComputed(function() {
		return Math.floor(this.displayWidth()) + 'px';
	}, this);

	this.displayHeightCss = ko.pureComputed(function() {
		return Math.floor(this.displayHeight()) + 'px';
	}, this);

	this.cssUrl = function() { return 'url(' + url + ')'}
}

function GalleryViewModel(rows) {

    var self = this;
	self.pages = ko.observableArray();

    self.init = function() {

		window.onresize = function(event) {
			vm.calculateFit();
		}
    }

    self.addPage = function(page){

    	self.pages.push(page);
    	self.calculateFit();
    }

	self.resize = function(photo, maxWidth, maxHeight) {

	    var ratio = maxHeight / photo.height;

	    photo.displayWidth(photo.width*ratio);
	    photo.displayHeight(maxHeight);
	}

	self.calculateFit = function(){

        if(self.pages().length == 0) return;

        self.roundingFudgeFactor = 2;
        self.viewportWidth = document.getElementById("container").clientWidth-self.roundingFudgeFactor;
        self.idealHeight = window.outerHeight / 3;

		for (var p = 0; p < self.pages().length; p++) {

            self.summedWidth = 0;
			self.overallIndex = 0;
			self.weights = [];
			self.rowBuffer = [];
			self.photos = self.pages()[p].photos;
            
			for (var i = 0; i < self.photos().length; i++) {
				self.summedWidth += (self.photos()[i].aspectRatio * self.idealHeight);
				self.weights.push(self.photos()[i].aspectRatio)
			};

            self.rows = 50;
            //self.rows = Math.round(Math.floor(self.summedWidth) / Math.floor(self.viewportWidth));
			self.partition = linearPartition(self.weights, self.rows);

			for (var r = 0; r < self.partition.length; r++) {
				
				self.row = self.partition[r];
				self.rowSummedAspectRatios = 0;
				self.rowSummedWidth = 0;
				self.rowBuffer = [];

				for (var i = 0; i < self.row.length; i++) {
					self.rowBuffer.push(self.photos()[self.overallIndex++]);
				};

				for (var z = 0; z < self.rowBuffer.length; z++) {
					self.rowSummedAspectRatios += self.rowBuffer[z].aspectRatio;
				};

				for (var i = 0; i < self.rowBuffer.length; i++) {
					self.resize(self.rowBuffer[i],self.viewportWidth / self.rowSummedAspectRatios * self.rowBuffer[i].aspectRatio, self.viewportWidth / self.rowSummedAspectRatios);
				}
			};
		}
	}

	self.init();
}

var linearPartition = function (seq, k) {
    var i, n, partitionTable, table, solution, ans = [],
        finalResult = [];

    if (k <= 0) {
        return finalResult;
    }

    n = seq.length - 1;

    if (k > n) {
        for (i = 0; i < seq.length; i++) {
            finalResult.push([seq[i]]);
        }

        return finalResult;
    }

    partitionTable = linearPartitionTable(seq, k);

    table = partitionTable[0];
    solution = partitionTable[1];

    k = k - 2;

    while (k >= 0) {
        var partialAns = [];

        for (i = solution[n - 1][k] + 1; i < n + 1; i++) {
            partialAns.push(seq[i]);
        }

        partialAns = [partialAns];

        ans = partialAns.concat(ans);
        n = solution[n - 1][k];
        k = k - 1;
    }

    for (i = 0; i < n + 1; i++) {
        finalResult.push(seq[i]);
    }

    finalResult = [finalResult];

    return finalResult.concat(ans);
};

var linearPartitionTable = function (seq, k) {
    var i, j, n = seq.length,
        row = [],
        table = [],
        solution = [];

    // Create the table
    for (i = 0; i < n; i++) {
        row = [];
        for (j = 0; j < k; j++) {
            row.push(0);
        }
        table.push(row);
    }

    // Create solution
    for (i = 0; i < n - 1; i++) {
        row = [];
        for (j = 0; j < k - 1; j++) {
            row.push(0);
        }
        solution.push(row);
    }

    for (i = 0; i < n; i++) {
        table[i][0] = seq[i] + (i ? table[i - 1][0] : 0);
    }

    for (i = 0; i < k; i++) {
        table[0][i] = seq[0];
    }

    for (i = 1; i < n; i++) {
        for (j = 1; j < k; j++) {
            var listToMin = [],
                x;
            for (x = 0; x < i; x++) {
                listToMin.push([Math.max.apply(Math, [table[x][j - 1], table[i][0] - table[x][0]]), x]);
            }

            var result = {
                computed: Infinity,
                value: Infinity
            };
            for (x = 0; x < listToMin.length; x++) {
                listToMin[x][0] < result.computed && (result = {
                    value: listToMin[x],
                    computed: listToMin[x][0]
                });
            }

            table[i][j] = result.value[0];
            solution[i - 1][j - 1] = result.value[1];
        }
    }

    return [table, solution];
};

