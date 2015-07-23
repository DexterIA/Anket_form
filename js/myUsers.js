var app = angular.module('myApp', ['pascalprecht.translate']);

app.config(function ($translateProvider) {
    $translateProvider.translations('en', {
        LANGUAGE: 'Language',
        RUSSIAN: 'Russian',
        ENGLISH: 'English',
        LASTNAME: 'Last name',
        MAIDENNAME: 'Maiden name',
        WANT_DELETE: 'Do you want to delete your children?',
        FIRSTNAME: 'First name',
        MIDDLENAME: 'Middle name',
        AGE: 'Age',
        MALE: 'Male',
        FEMALE: 'Female',
        MMARIED: 'Married',
        FMARIED: 'Married',
        SEX: 'Sex',
        HASCHILDREN: 'Has children',
        ADDCHILD: '+Add child',
        SAVE: 'Save',
        REQUIRED : 'Required field'
    });
    $translateProvider.translations('ru', {
        LANGUAGE: 'Язык',
        RUSSIAN: 'Русский',
        ENGLISH: 'Английский',
        LASTNAME: 'Фамилия',
        MAIDENNAME: 'Девичья фамилия',
        WANT_DELETE: 'Удалить?',
        FIRSTNAME: 'Имя',
        MIDDLENAME: 'Отчество',
        AGE: 'Возраст',
        MALE: 'Мужской',
        FEMALE: 'Женский',
        MMARIED: 'Женат',
        FMARIED: 'Замужем',
        SEX: 'Пол',
        HASCHILDREN: 'С детьми',
        ADDCHILD: '+Добавить ребёнка',
        SAVE: 'Сохранить',
        REQUIRED : 'Обязательно для заполнения'
    });
    $translateProvider.preferredLanguage('ru');
});

app.controller('userCtrl', function ($scope, $translate, $http) {
    $scope.result = {
        sex: '0',
        firstname : '',
        lastname : '',
        child: false,
        married: false,
        language: 'ru',
        children: []
    };
    $scope.changeLanguage = function () {
        $translate.use($scope.result.language);
    };

    $scope.save_result = function () {
        if (($scope.result.firstname!='') && ($scope.result.lastname != '')) {
            switch ($scope.result.language) {
                case 'ru' :
                {
                    $scope.result.sex = ($scope.result.sex == '0') ? 'Женский' : 'Мужской';
                    break;
                }
                case 'en' :
                {
                    $scope.result.sex = ($scope.result.sex == '0') ? 'Female' : 'Male';
                    break;
                }
            }
            $http.post('saveJson.php', $scope.result).then(function() {
            });
            alert(JSON.stringify($scope.result));
            $scope.result = {
                sex: 0,
                child: false,
                married: 0,
                language: 'ru',
                children: []
            };
        }
    };

    $scope.newChild = null;

    $scope.addChild = function () {
        if ($scope.newChild == null) {
            $scope.newChild = {};
        } else {
            $scope.result.children.push($scope.newChild);
            $scope.newChild = null;
        }
    };
    $scope.removeChild = function (index) {
        if (confirm($translate.instant('WANT_DELETE'))) {
            $scope.result.children.splice(index, 1);
        }
    }
});