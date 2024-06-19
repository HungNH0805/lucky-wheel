<?php namespace backend\controllers;

use backend\models\CauHinh;
use backend\models\DailyQuest;
use backend\models\DailyQuestUser;
use backend\models\HistoryReward;
use backend\models\Price;
use backend\models\Quest;
use backend\models\QuestUser;
use backend\models\RotationConfig;
use backend\models\SettingUser;
use backend\models\SpinPrice;
use common\models\myAPI;
use common\models\User;
use Exception;
use Pusher;
use yii\bootstrap\Html;
use yii\helpers\ArrayHelper;
use yii\helpers\VarDumper;
use yii\web\HttpException;

class PriceController extends CoreApiController
{
    public function actionIndex()
    {
        $models = Price::find()->all();
        $data = [];
        /** @var Quest $model */
        foreach ($models as $model) {
            $data[] = [
                'id' => $model->id,
                'title' => $model->title,
                'image' => $model->image,
                'note' => $model->note,
            ];
        }
        return $this->outputSuccess($data);
    }
}
